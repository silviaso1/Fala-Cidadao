package com.POA.conserva_cidadao_app.dto;

import com.POA.conserva_cidadao_app.model.StatusDenuncia;

import java.util.List;

public class DenunciaResponseDTO {
    private Long id;
    private UsuarioResponseDTO usuario;
    private String titulo;
    private String descricao;
    private StatusDenuncia status;
    private int likes;
    private List<String> imagens;

    public DenunciaResponseDTO() {}

    public DenunciaResponseDTO(Long id, UsuarioResponseDTO usuario, String titulo, String descricao, StatusDenuncia status, int likes, List<String> imagens) {
        this.id = id;
        this.usuario = usuario;
        this.titulo = titulo;
        this.descricao = descricao;
        this.status = status;
        this.likes = likes;
        this.imagens = imagens;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UsuarioResponseDTO getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioResponseDTO usuario) {
        this.usuario = usuario;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public StatusDenuncia getStatus() {
        return status;
    }

    public void setStatus(StatusDenuncia status) {
        this.status = status;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public List<String> getImagens() {
        return imagens;
    }

    public void setImagens(List<String> imagens) {
        this.imagens = imagens;
    }
}
