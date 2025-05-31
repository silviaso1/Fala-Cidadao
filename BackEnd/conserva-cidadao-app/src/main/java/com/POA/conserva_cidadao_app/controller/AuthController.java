package com.POA.conserva_cidadao_app.controller;

import com.POA.conserva_cidadao_app.model.Usuario;
import com.POA.conserva_cidadao_app.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> body) {
        try {
            String email = body.get("email");
            String senha = body.get("senha");

            if(email == null || senha == null) {
                Map<String, Object> error = new HashMap<>();
                error.put("erro", "Email e senha são obrigatórios");
                return ResponseEntity.badRequest().body(error);
            }

            return ResponseEntity.ok(authService.login(email, senha));
        } catch (Exception e) {
            return handleException(e);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Usuario usuario) {
        try {
            
            if(usuario.getNome() == null || usuario.getEmail() == null || usuario.getSenha() == null) {
                Map<String, Object> error = new HashMap<>();
                error.put("erro", "Nome, email e senha são obrigatórios");
                return ResponseEntity.badRequest().body(error);
            }

            return ResponseEntity.ok(authService.register(usuario));
        } catch (Exception e) {
            return handleException(e);
        }
    }

    private ResponseEntity<Map<String, Object>> handleException(Exception e) {
        
        e.printStackTrace();

        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("status_code", 500);
        errorResponse.put("erro", "Erro interno no servidor");
        errorResponse.put("mensagem", e.getMessage());
        errorResponse.put("tipo_erro", e.getClass().getName());

        
        if(e.getCause() != null) {
            errorResponse.put("causa", e.getCause().getMessage());
        }

        return ResponseEntity.internalServerError().body(errorResponse);
    }
}