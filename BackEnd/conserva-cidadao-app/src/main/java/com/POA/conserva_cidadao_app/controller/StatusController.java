package com.POA.conserva_cidadao_app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {

    @GetMapping("/status")
    public String status() {
        return "Servidor rodando na porta 3001! rsrs";
    }
}