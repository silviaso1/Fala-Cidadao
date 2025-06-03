package com.POA.conserva_cidadao_app.dto;

public class UsuarioResponseDTO {
    private Long id;
    private String nome;

    public UsuarioResponseDTO() {}

    public UsuarioResponseDTO(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
