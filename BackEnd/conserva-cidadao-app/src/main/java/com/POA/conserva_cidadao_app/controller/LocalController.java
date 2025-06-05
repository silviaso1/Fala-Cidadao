package com.POA.conserva_cidadao_app.controller;

import com.POA.conserva_cidadao_app.model.Local;
import com.POA.conserva_cidadao_app.repository.LocalRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/locais")
public class LocalController {

    private final LocalRepository localRepository;

    public LocalController(LocalRepository localRepository) {
        this.localRepository = localRepository;
    }

    @GetMapping("/ativos")
    public List<Local> getTop3LocaisComDenunciasAtivas() {
        return localRepository.findLocais();
    }
}