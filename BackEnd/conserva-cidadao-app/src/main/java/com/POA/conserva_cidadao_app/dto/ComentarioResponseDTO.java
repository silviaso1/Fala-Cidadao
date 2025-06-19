package com.POA.conserva_cidadao_app.dto;

import java.time.LocalDateTime;

public record ComentarioResponseDTO(
        Long id,
        String texto,
        String nomeUsuario,
        LocalDateTime dataCriacao
) {}
