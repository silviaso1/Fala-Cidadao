package com.POA.conserva_cidadao_app.dto;

import com.POA.conserva_cidadao_app.model.StatusDenuncia;
import java.util.List;
import java.time.LocalDateTime;

public class DenunciaResponseDTO {
    private Long id;
    private UsuarioResponseDTO usuario;
    private String titulo;
    private String descricao;
    private String bairro;
    private StatusDenuncia status;
    private int likes;
    private List<String> imagens;
    private LocalDateTime dataCriacao;
    private Double latitude;
    private Double longitude;


    public DenunciaResponseDTO() {}

    public DenunciaResponseDTO(Long id, UsuarioResponseDTO usuario, String titulo, String descricao,
                               String bairro, StatusDenuncia status, int likes, List<String> imagens,
                               LocalDateTime dataCriacao, Double latitude, Double longitude) {
        this.id = id;
        this.usuario = usuario;
        this.titulo = titulo;
        this.descricao = descricao;
        this.bairro = bairro;
        this.status = status;
        this.likes = likes;
        this.imagens = imagens;
        this.dataCriacao = dataCriacao;
        this.latitude = latitude;
        this.longitude = longitude;
    }


    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
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


    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

}