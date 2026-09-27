package com.experience.verify_email.controllers;

import com.experience.verify_email.DTO.SendCodeRequest;
import com.experience.verify_email.DTO.VerifyCodeRequest;
import com.experience.verify_email.services.EmailService;
import com.experience.verify_email.services.VerificationCodeService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
// conecta as requisicoes feitas com os /services da api
public class VerificationController {

    private static final Logger log = LoggerFactory.getLogger(VerificationController.class);

    private final EmailService emailService;
    private final VerificationCodeService verificationCodeService;

    // cria uma nova instancia do controller , injetando os metodos criados em ambos os services
    public VerificationController(EmailService emailService,VerificationCodeService verificationCodeService) {
        this.emailService = emailService;
        this.verificationCodeService = verificationCodeService;
    }

    // converte o json recebido em DTO e chama o generateCode do service para gerar e fazer o envio para o email destinado
    @PostMapping("/send-code")
    public ResponseEntity<String> sendCode(@Valid @RequestBody SendCodeRequest request) {
        String code = verificationCodeService.generateCode(request.getEmail());
        try {
            emailService.sendVerificationCode(request.getEmail(), code);
        } catch (Exception e) {
            log.error("Falha ao enviar e-mail para {}", request.getEmail(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Não foi possível enviar o e-mail. Tente novamente.");
        }
        return ResponseEntity.ok("Código enviado com sucesso.");
    }

    // endpoint que recebe o json com email do destinatario e o codigo e chama o service para fazer a validação das informacoes 
    @PostMapping("/verify-code")
    public ResponseEntity<String> verifyCode(@Valid @RequestBody VerifyCodeRequest request) {
        VerificationCodeService.verificarResultado result =
                verificationCodeService.verificarCodigo(request.getEmail(), request.getCode());

        return switch (result) {
            case SUCESSO -> ResponseEntity.ok("Código válido.");
            case INVALIDO -> ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Código incorreto.");
            case EXPIRADO -> ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Código expirado. Solicite um novo.");
            case NAO_ENCONTRADO -> ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Nenhum código pendente para este e-mail.");
            case TENTATIVAS_EXCEDIDAS -> ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body("Número máximo de tentativas excedido. Solicite um novo código.");
        };
    }
}
