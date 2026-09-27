package com.experience.verify_email.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;

// classe representa os dados que a api espera  para fazer a requisição de um código
public class SendCodeRequest {

    // para fazer a requisição de envio do código é necessario informar um email válido
    @NotBlank(message = "O email é obrigatório")
    @Email(message = "Email inválido")
    private String email;


    public SendCodeRequest() {}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
