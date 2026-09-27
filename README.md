# API de verificação de e-mail

Backend REST em Java e Spring Boot para enviar um código por e-mail e validar o código informado pelo usuário.

## Tecnologias

- Java 17
- Spring Boot
- Maven
- SMTP do Gmail

## Estrutura

```text
verify-email/
├── pom.xml # dependencias do projeto
├── mvnw
├── mvnw.cmd
└── src/
    ├── main/
    │   ├── java/com/experience/verify_email/
    │   │   ├── controllers/   # Endpoints da API
    │   │   ├── DTO/           # Dados das requisições
    │   │   ├── exception/     # Tratamento de erros
    │   │   ├── services/      # Envio e validação dos códigos
    │   │   └── VerifyEmailApplication.java
    │   └── resources/
    │       └── application.properties
    └── test/                  # Testes
```

## Como funciona

1. `POST /api/auth/send-code` recebe um e-mail, gera um código de seis dígitos e envia o código por SMTP.
2. O usuário informa o código recebido.
3. `POST /api/auth/verify-code` recebe o e-mail e o código informado e verifica se ele está correto.

Os códigos ficam armazenados em memória, expiram em cinco minutos e têm um limite de tentativas. Reiniciar a aplicação apaga os códigos pendentes.

## Configuração

Configure `spring.mail.username` e `spring.mail.password` em `src/main/resources/application.properties` com suas próprias credenciais SMTP. Para Gmail, use uma senha de app. Não versione nem compartilhe credenciais reais.

## Executar

Requisito: Java 17 ou superior.

No Windows:

```powershell
cd verify-email
.\mvnw.cmd spring-boot:run
```

A API inicia na porta `8080`.

Para executar os testes, use `.\mvnw.cmd test` no Windows ou `./mvnw test` no Linux/macOS.
