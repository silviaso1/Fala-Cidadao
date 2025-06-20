package com.POA.conserva_cidadao_app.service;

import com.POA.conserva_cidadao_app.dto.UsuarioResponseDTO;
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
            Usuario u = usuario.get();
            UsuarioResponseDTO dto = new UsuarioResponseDTO(u.getId(), u.getNome());

            response.put("mensagem", "Login realizado com sucesso.");
            response.put("token", "jwt-token-gerado");
            response.put("usuario", dto); // 🔐 sem senha aqui
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

        if (novoUsuario.getRole() == null) {
            novoUsuario.setRole("usuario");
        }

        Usuario salvo = usuarioRepository.save(novoUsuario);
        UsuarioResponseDTO dto = new UsuarioResponseDTO(salvo.getId(), salvo.getNome());

        response.put("mensagem", "Usuário registrado com sucesso.");
        response.put("usuario", dto);
        return response;
    }
}
