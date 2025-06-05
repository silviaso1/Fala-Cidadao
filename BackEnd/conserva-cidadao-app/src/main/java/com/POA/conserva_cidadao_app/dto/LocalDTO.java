package com.POA.conserva_cidadao_app.dto;

public class LocalDTO {
    private Long id;
    private String bairro;
    private int quantidadeDenunciasAtivas;

    public LocalDTO() {}

    public LocalDTO(Long id, String bairro, int quantidadeDenunciasAtivas) {
        this.id = id;
        this.bairro = bairro;
        this.quantidadeDenunciasAtivas = quantidadeDenunciasAtivas;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public int getQuantidadeDenunciasAtivas() {
        return quantidadeDenunciasAtivas;
    }

    public void setQuantidadeDenunciasAtivas(int quantidadeDenunciasAtivas) {
        this.quantidadeDenunciasAtivas = quantidadeDenunciasAtivas;
    }
}