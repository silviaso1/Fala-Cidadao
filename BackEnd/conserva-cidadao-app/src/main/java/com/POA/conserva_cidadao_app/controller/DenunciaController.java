package com.POA.conserva_cidadao_app.controller;

import com.POA.conserva_cidadao_app.dto.DenunciaRequestDTO;
import com.POA.conserva_cidadao_app.dto.DenunciaResponseDTO;
import com.POA.conserva_cidadao_app.model.Denuncia;
import com.POA.conserva_cidadao_app.service.DenunciaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/denuncias")
public class DenunciaController {

    private final DenunciaService denunciaService;

    public DenunciaController(DenunciaService denunciaService) {
        this.denunciaService = denunciaService;
    }

    @GetMapping
    public List<DenunciaResponseDTO> listarTodasDenuncias() {
        return denunciaService.listarTodasDenuncias();
    }

    @PostMapping
    public ResponseEntity<?> criarDenuncia(@RequestBody DenunciaRequestDTO request) {
        try {
            Denuncia novaDenuncia = denunciaService.criarDenuncia(request);
            DenunciaResponseDTO dto = denunciaService.mapToDTO(novaDenuncia);
            return ResponseEntity.status(201).body(dto);
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
    public ResponseEntity<?> atualizarDenuncia(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {

        Long usuarioId = Long.valueOf(body.get("usuarioId").toString());

        try {
            Denuncia denunciaAtualizada = denunciaService.atualizarDenuncia(id, body, usuarioId);
            return ResponseEntity.ok(Map.of(
                    "mensagem", "Denúncia atualizada com sucesso.",
                    "denuncia", Map.of(
                            "id", denunciaAtualizada.getId(),
                            "status", denunciaAtualizada.getStatus().toString()
                    )
            ));
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body(Map.of("erro", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarDenuncia(
            @PathVariable Long id,
            @RequestParam Long usuarioId) {  // Mudança aqui, usando RequestParam

        try {
            denunciaService.deletarDenuncia(id, usuarioId);
            return ResponseEntity.ok(Map.of("mensagem", "Denúncia excluída com sucesso."));
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body(Map.of("erro", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(Map.of("erro", "Denúncia não encontrada."));
        }
    }
}
