package com.POA.conserva_cidadao_app.controller;

import com.POA.conserva_cidadao_app.model.Denuncia;
import com.POA.conserva_cidadao_app.model.StatusDenuncia;
import com.POA.conserva_cidadao_app.service.DenunciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/denuncias")
public class DenunciaController {

    @Autowired
    private DenunciaService denunciaService;

    @GetMapping
    public List<Denuncia> listarTodasDenuncias() {
        return denunciaService.listarTodasDenuncias();
    }

    @PostMapping
    public ResponseEntity<?> criarDenuncia(@RequestBody Denuncia denuncia) {
        try {
            Denuncia novaDenuncia = denunciaService.criarDenuncia(denuncia);
            return ResponseEntity.ok(Map.of(
                    "mensagem", "Denúncia registrada com sucesso.",
                    "denuncia", Map.of(
                            "id", novaDenuncia.getId(),
                            "status", novaDenuncia.getStatus().toString()
                    )
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status_code", 400,
                    "erro", e.getMessage()
            ));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarDenunciaPorId(@PathVariable Long id) {
        Optional<Denuncia> denuncia = denunciaService.buscarDenunciaPorId(id);
        if (denuncia.isPresent()) {
            return ResponseEntity.ok(denuncia.get());
        } else {
            return ResponseEntity.status(404).body(Map.of(
                    "status_code", 404,
                    "erro", "Denúncia não encontrada."
            ));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarStatusDenuncia(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            StatusDenuncia novoStatus = StatusDenuncia.valueOf(body.get("status").toUpperCase());
            Denuncia denunciaAtualizada = denunciaService.atualizarStatusDenuncia(id, novoStatus);
            return ResponseEntity.ok(Map.of(
                    "mensagem", "Denúncia atualizada com sucesso.",
                    "denuncia", Map.of(
                            "id", denunciaAtualizada.getId(),
                            "status", denunciaAtualizada.getStatus().toString()
                    )
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(Map.of(
                    "status_code", 404,
                    "erro", "Denúncia não encontrada."
            ));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of(
                    "status_code", 400,
                    "erro", "Status inválido"
            ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarDenuncia(@PathVariable Long id) {
        try {
            denunciaService.deletarDenuncia(id);
            return ResponseEntity.ok(Map.of("mensagem", "Denúncia excluída com sucesso."));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of(
                    "status_code", 404,
                    "erro", "Denúncia não encontrada ou você não tem permissão."
            ));
        }
    }
}