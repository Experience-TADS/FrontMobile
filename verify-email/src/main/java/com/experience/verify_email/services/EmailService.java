package com.experience.verify_email.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
//responsavel pelo envio do email ao destinatario com o codigo de verificacao gerado
public class EmailService {

    private final JavaMailSender enviarEmail;

    // guarda o email do remetente que sera usado para enviar o codigo ( criado um padrao )
    @Value("${spring.mail.username}")
    private String emailRemetente;

    // construtor que recebe o built in JavaMailSender para enviar o email
    public EmailService(JavaMailSender emailEnviado) {
        this.enviarEmail = emailEnviado;
    }

    // cria o corpo do email com o codigo que o destinatario ira receber 
    public void sendVerificationCode(String toEmail, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(emailRemetente);
        message.setTo(toEmail);
        message.setSubject("Seu código de verificação");
        message.setText(
            "Seu código de verificação é: " + code + "\n\n" +
            "Ele expira em alguns minutos. Se você não solicitou este código, ignore este e-mail."
        );
        enviarEmail.send(message);
    }
}

