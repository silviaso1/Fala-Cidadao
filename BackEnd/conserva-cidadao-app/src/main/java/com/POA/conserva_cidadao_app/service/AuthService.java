package com.POA.conserva_cidadao_app.service;

// Atualize os imports

import com.POA.conserva_cidadao_app.model.Usuario;
import com.POA.conserva_cidadao_app.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Map<String, Object> login(String email, String senha) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        Map<String, Object> response = new HashMap<>();

        if (usuario.isPresent() && usuario.get().getSenha().equals(senha)) {
            response.put("mensagem", "Login realizado com sucesso.");
            response.put("token", "jwt-token-gerado");
            response.put("usuario", usuario.get());
        } else {
            response.put("status_code", 401);
            response.put("erro", "Credenciais inválidas.");
        }
        return response;
    }

    public Map<String, Object> register(Usuario novoUsuario) {
        Map<String, Object> response = new HashMap<>();
        Optional<Usuario> existente = usuarioRepository.findByEmail(novoUsuario.getEmail());

        if (existente.isPresent()) {
            response.put("status_code", 400);
            response.put("erro", "Email já cadastrado.");
            return response;
        }

        // Garante o role padrão
        if (novoUsuario.getRole() == null) {
            novoUsuario.setRole("usuario");
        }

        Usuario salvo = usuarioRepository.save(novoUsuario);
        response.put("mensagem", "Usuário registrado com sucesso.");
        response.put("usuario", salvo);
        return response;
    }
}