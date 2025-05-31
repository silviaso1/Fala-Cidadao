package com.POA.conserva_cidadao_app.service;

import com.POA.conserva_cidadao_app.model.Denuncia;
import com.POA.conserva_cidadao_app.model.StatusDenuncia;
import com.POA.conserva_cidadao_app.repository.DenunciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DenunciaService {

    @Autowired
    private DenunciaRepository denunciaRepository;

    public List<Denuncia> listarTodasDenuncias() {
        return denunciaRepository.findAll();
    }

    public Denuncia criarDenuncia(Denuncia denuncia) {
        if (denuncia.getImagens() != null && denuncia.getImagens().size() > 4) {
            throw new IllegalArgumentException("Número de imagens excede o limite permitido (4).");
        }
        return denunciaRepository.save(denuncia);
    }

    public Optional<Denuncia> buscarDenunciaPorId(Long id) {
        return denunciaRepository.findById(id);
    }

    public Denuncia atualizarStatusDenuncia(Long id, StatusDenuncia novoStatus) {
        Denuncia denuncia = denunciaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Denúncia não encontrada."));
        denuncia.setStatus(novoStatus);
        return denunciaRepository.save(denuncia);
    }

    public void deletarDenuncia(Long id) {
        denunciaRepository.deleteById(id);
    }
}