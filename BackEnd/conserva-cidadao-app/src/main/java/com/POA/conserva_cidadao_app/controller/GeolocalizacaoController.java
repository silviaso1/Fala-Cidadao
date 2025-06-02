package com.POA.conserva_cidadao_app.controller;

import com.POA.conserva_cidadao_app.service.GeocodingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/geo")
public class GeolocalizacaoController {

    private final GeocodingService geocodingService;

    @Autowired
    public GeolocalizacaoController(GeocodingService geocodingService) {
        this.geocodingService = geocodingService;
    }

    @PostMapping
    public ResponseEntity<?> getCoordenadas(@RequestBody Map<String, String> request) {
        try {
            String endereco = request.get("endereco");
            Map<String, Double> coordenadas = geocodingService.getLatLng(endereco);
            return ResponseEntity.ok(coordenadas);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao geocodificar endereço: " + e.getMessage());
        }
    }
}