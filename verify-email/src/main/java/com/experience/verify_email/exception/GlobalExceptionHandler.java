package com.experience.verify_email.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
// trata os erros de forma centralizada, retornando uma resposta na hora da requisicao caso algum erro aconteça
public class GlobalExceptionHandler {

    // captura erros de validacao dos dados recebidos pela requisicao
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidation(MethodArgumentNotValidException ex) {
        // procura os erros encontrados nos campos e seleciona o primeiro
        String message = ex.getBindingResult().getFieldErrors().stream()
                .findFirst()
                // pega a mensagem definida na anotacao de validacao do campo
                .map(fieldError -> fieldError.getDefaultMessage())
                // usa uma mensagem padrao caso nenhum erro especifico seja encontrado
                .orElse("Dados inválidos.");
        // retorna a mensagem com status 400, indicando que os dados da requisicao sao invalidos
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }
}
