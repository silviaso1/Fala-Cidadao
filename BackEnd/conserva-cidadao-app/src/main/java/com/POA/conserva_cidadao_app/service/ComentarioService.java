package com.POA.conserva_cidadao_app.service;

import com.POA.conserva_cidadao_app.model.Comentario;
import com.POA.conserva_cidadao_app.model.Denuncia;
import com.POA.conserva_cidadao_app.model.Usuario;
import com.POA.conserva_cidadao_app.repository.ComentarioRepository;
import com.POA.conserva_cidadao_app.repository.DenunciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepository;

    @Autowired
    private DenunciaRepository denunciaRepository;

    public Comentario adicionarComentario(Long denunciaId, Usuario usuario, String texto) {
        Denuncia denuncia = denunciaRepository.findById(denunciaId)
                .orElseThrow(() -> new IllegalArgumentException("Denúncia não encontrada"));

        Comentario comentario = new Comentario();
        comentario.setDenuncia(denuncia);
        comentario.setUsuario(usuario);
        comentario.setTexto(texto);

        return comentarioRepository.save(comentario);
    }

    public List<Comentario> listarComentariosPorDenuncia(Long denunciaId) {
        return comentarioRepository.findByDenunciaIdOrderByDataCriacaoDesc(denunciaId);
    }
}
