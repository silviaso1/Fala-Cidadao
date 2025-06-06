package com.POA.conserva_cidadao_app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "locais")
public class Local {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String bairro;

    @Column(nullable = false)
    private int quantidadeDenunciasAtivas = 0;

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

    public void incrementarQuantidade() {
        this.quantidadeDenunciasAtivas++;
    }

    public void decrementarQuantidade() {
        if (this.quantidadeDenunciasAtivas > 0) {
            this.quantidadeDenunciasAtivas--;
        }
    }
}