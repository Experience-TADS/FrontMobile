package com.experience.verify_email.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

// recebe o valor do email e codigo para validar se o codigo existe e o email é válido
public class VerifyCodeRequest {

    @NotBlank(message = "O email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "O código de verificação é obrigatório")
    private String codigo;

    public VerifyCodeRequest(String email, String codigo) {
        this.email = email;
        this.codigo = codigo;
    }

     public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCode() {
        return codigo;
    }

    public void setCode(String codigo) {
        this.codigo = codigo;
    }
}
