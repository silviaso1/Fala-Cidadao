package com.POA.conserva_cidadao_app.controller;

import com.POA.conserva_cidadao_app.model.Comentario;
import com.POA.conserva_cidadao_app.model.Usuario;
import com.POA.conserva_cidadao_app.repository.UsuarioRepository;
import com.POA.conserva_cidadao_app.service.ComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.POA.conserva_cidadao_app.dto.ComentarioResponseDTO;
import java.util.*;

@RestController
@RequestMapping("/denuncias/{denunciaId}/comentarios")
public class ComentarioController {

    @Autowired
    private ComentarioService comentarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    public ResponseEntity<?> comentar(@PathVariable Long denunciaId, @RequestParam Long usuarioId, @RequestBody Map<String, String> body) {
        try {
            Usuario usuario = usuarioRepository.findById(usuarioId)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            String texto = body.get("texto");
            if (texto == null || texto.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("erro", "Texto do comentário não pode estar vazio"));
            }

            Comentario novoComentario = comentarioService.adicionarComentario(denunciaId, usuario, texto);

            ComentarioResponseDTO response = new ComentarioResponseDTO(
                    novoComentario.getId(),
                    novoComentario.getTexto(),
                    novoComentario.getUsuario().getNome(),
                    novoComentario.getDataCriacao()
            );

            return ResponseEntity.ok(response);


        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("erro", "Erro interno: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> listar(@PathVariable Long denunciaId) {
        try {
            List<Comentario> comentarios = comentarioService.listarComentariosPorDenuncia(denunciaId);

            List<ComentarioResponseDTO> response = comentarios.stream()
                    .map(c -> new ComentarioResponseDTO(
                            c.getId(),
                            c.getTexto(),
                            c.getUsuario().getNome(),
                            c.getDataCriacao()
                    ))
                    .toList();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("erro", "Erro ao buscar comentários: " + e.getMessage()));
        }
    }

}
