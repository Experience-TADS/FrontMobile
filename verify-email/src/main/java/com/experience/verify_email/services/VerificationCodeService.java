package com.experience.verify_email.services;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

@Service
// classe que contem os metodos para gerar um novo codigo de verificacao
public class VerificationCodeService {

    // caracteristicas do codigo
    public static final int tamanho = 6;
    public static final long codigoDuracaoMin = 5;
    public static final int codigoTentativas = 5;

    // armazena temporariamente o codigo gerado para cadas email
    private final Map<String, CodeEntry> store = new ConcurrentHashMap<>();
    // gera numeros aleatorios para compor o codigo
    private final SecureRandom randomico = new SecureRandom();

    // usa o stringBuilder para gerar um codigo random de 6 digitos e armazena no store criado
    public String generateCode(String email) {
        StringBuilder codigoBuilder = new StringBuilder(tamanho);
            for (int i = 0; i < tamanho; i++) {
                codigoBuilder.append(randomico.nextInt(10));
            }

            String codigo = codigoBuilder.toString();
            Instant expiresAt = Instant.now().plusSeconds(codigoDuracaoMin * 60);
            store.put(normalize(email), new CodeEntry(codigo, expiresAt, 0));
            return codigo;
    }

    // possiveis resultados da verificacao do codigo
    public enum verificarResultado {
        SUCESSO,
        EXPIRADO,
        INVALIDO,
        TENTATIVAS_EXCEDIDAS,
        NAO_ENCONTRADO
    }

    // evira case sensitive transformando em minusculo e removendo espaços em branco
    public String normalize(String email) {
        return email.trim().toLowerCase();
    }

    // representa a entrada de um novo codigo, com as infos necessarias
    public record CodeEntry(String codigo, Instant duracao, int tentativas) {
        CodeEntry incrementarTentativas() {
            return new CodeEntry(codigo, duracao, tentativas + 1);
        }
    }

    // verifica se o codigo existe e é valido, se nao , retorna o resultado da verificacao correspondente
    public verificarResultado verificarCodigo(String email, String codigo) {
    String chave = normalize(email); //guarda o email na variavel usando a formatacao criada no normalize
    CodeEntry entrada = store.get(chave);// busca os dados do código associados a esse email dentro de store

    // verifica se existe um codigo guardado para esse email
    if (entrada == null) {
        return verificarResultado.NAO_ENCONTRADO;
    }

    // verifica se o codigo ja passou do prazo de validade; se passou, remove do store
    if (Instant.now().isAfter(entrada.duracao())) {
        store.remove(chave);
        return verificarResultado.EXPIRADO;
    }

    // verifica se o usuario ja atingiu o limite de tentativas; se atingiu, remove o codigo
    if (entrada.tentativas() >= codigoTentativas) {
        store.remove(chave);
        return verificarResultado.TENTATIVAS_EXCEDIDAS;
    }

    // compara o codigo guardado com o codigo informado; se forem iguais, remove para nao reutilizar
    if (entrada.codigo().equals(codigo)) {
        store.remove(chave);
        return verificarResultado.SUCESSO;
    }

    // se o codigo estiver incorreto, atualiza a entrada com mais uma tentativa
    store.put(chave, entrada.incrementarTentativas());
    return verificarResultado.INVALIDO;
}
}
