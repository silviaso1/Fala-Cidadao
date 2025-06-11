package com.POA.conserva_cidadao_app.service;

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

            response.put("mensagem", "Login realizado com sucesso.");
            response.put("token", "jwt-token-gerado"); // Aqui pode gerar token real
            response.put("usuario", u); // Retorna o usuário completo (ou você pode filtrar campos)
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

        response.put("mensagem", "Usuário registrado com sucesso.");
        response.put("usuario", salvo);
        return response;
    }

    public Usuario atualizarUsuario(Long id, Usuario usuarioAtualizado) throws Exception {
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);

        if (!optionalUsuario.isPresent()) {
            throw new Exception("Usuário não encontrado");
        }

        Usuario usuario = optionalUsuario.get();

        if (usuarioAtualizado.getNome() != null) {
            usuario.setNome(usuarioAtualizado.getNome());
        }
        if (usuarioAtualizado.getEmail() != null) {
            usuario.setEmail(usuarioAtualizado.getEmail());
        }
        if (usuarioAtualizado.getSenha() != null) {
            usuario.setSenha(usuarioAtualizado.getSenha());
        }
        if (usuarioAtualizado.getRole() != null) {
            usuario.setRole(usuarioAtualizado.getRole());
        }

        return usuarioRepository.save(usuario);
    }
}
