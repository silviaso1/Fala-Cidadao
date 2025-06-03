package com.POA.conserva_cidadao_app.controller;

import com.POA.conserva_cidadao_app.dto.DenunciaResponseDTO;
import com.POA.conserva_cidadao_app.service.DenunciaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
