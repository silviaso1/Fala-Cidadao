package com.POA.conserva_cidadao_app.service;
import com.POA.conserva_cidadao_app.dto.DenunciaRequestDTO;
import com.POA.conserva_cidadao_app.dto.DenunciaResponseDTO;
import com.POA.conserva_cidadao_app.dto.UsuarioResponseDTO;
import com.POA.conserva_cidadao_app.model.*;
import com.POA.conserva_cidadao_app.repository.DenunciaRepository;
import com.POA.conserva_cidadao_app.repository.LocalRepository;
import com.POA.conserva_cidadao_app.repository.UsuarioRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DenunciaService {

    private final DenunciaRepository denunciaRepository;
    private final UsuarioRepository usuarioRepository;
    private final LocalRepository localRepository;

    @Autowired
    public DenunciaService(DenunciaRepository denunciaRepository,
                           UsuarioRepository usuarioRepository,
                           LocalRepository localRepository) {
        this.denunciaRepository = denunciaRepository;
        this.usuarioRepository = usuarioRepository;
        this.localRepository = localRepository;
    }

    @PostConstruct
    public void init() {
        sincronizarLocaisComDenuncias();
    }

    private void sincronizarLocaisComDenuncias() {
        localRepository.deleteAll();

        List<String> bairros = denunciaRepository.findAllDistinctBairros();

        for (String bairro : bairros) {
            int count = denunciaRepository.countByBairroAndStatusIn(
                    bairro,
                    List.of(StatusDenuncia.DENUNCIADO, StatusDenuncia.EM_ANDAMENTO)
            );

            Local local = new Local();
            local.setBairro(bairro.toLowerCase());
            local.setQuantidadeDenunciasAtivas(count);
            localRepository.save(local);
        }
    }

    public List<DenunciaResponseDTO> listarTodasDenuncias() {
        List<Denuncia> denuncias = denunciaRepository.findAll();
        return denuncias.stream().map(this::mapToDTO).toList();
    }

    private DenunciaResponseDTO mapToDTO(Denuncia denuncia) {
        UsuarioResponseDTO usuarioDTO = new UsuarioResponseDTO(
                denuncia.getUsuario().getId(),
                denuncia.getUsuario().getNome(),
                denuncia.getUsuario().getRole()
        );

        return new DenunciaResponseDTO(
                denuncia.getId(),
                usuarioDTO,
                denuncia.getTitulo(),
                denuncia.getDescricao(),
                denuncia.getBairro(),
                denuncia.getStatus(),
                denuncia.getLikes(),
                denuncia.getImagens()
        );
    }

    public Denuncia criarDenuncia(DenunciaRequestDTO request) {
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        Denuncia denuncia = new Denuncia();
        denuncia.setTitulo(request.getTitulo());
        denuncia.setDescricao(request.getDescricao());
        denuncia.setImagens(request.getImagens());
        denuncia.setUsuario(usuario);
        denuncia.setStatus(StatusDenuncia.DENUNCIADO);
        denuncia.setLikes(0);
        denuncia.setBairro(request.getBairro());

        Denuncia savedDenuncia = denunciaRepository.save(denuncia);

        if (isStatusAtivo(savedDenuncia.getStatus())) {
            atualizarContagemBairro(savedDenuncia.getBairro(), true);
        }

        return savedDenuncia;
    }

    public Optional<Denuncia> buscarDenunciaPorId(Long id) {
        return denunciaRepository.findById(id);
    }

    public Denuncia atualizarDenuncia(Long id, Map<String, Object> body, Long usuarioId) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(usuarioId);
        if (optionalUsuario.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado.");
        }

        Usuario usuario = optionalUsuario.get();
        String usuarioRole = usuario.getRole();

        Optional<Denuncia> optionalDenuncia = denunciaRepository.findById(id);
        if (optionalDenuncia.isEmpty()) {
            throw new IllegalArgumentException("Denúncia não encontrada.");
        }

        Denuncia denuncia = optionalDenuncia.get();
        StatusDenuncia statusAntigo = denuncia.getStatus();
        String bairroAntigo = denuncia.getBairro();

        if (!denuncia.getUsuario().getId().equals(usuarioId) && !"admin".equalsIgnoreCase(usuarioRole)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Usuário não autorizado a atualizar esta denúncia.");
        }

        if (usuarioRole.equalsIgnoreCase("usuario") && body.containsKey("status")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Usuário comum não pode alterar o status.");
        }

        if (body.containsKey("descricao")) {
            denuncia.setDescricao(body.get("descricao").toString());
        }

        if (body.containsKey("bairro")) {
            denuncia.setBairro(body.get("bairro").toString());
        }

        if (body.containsKey("status") && usuarioRole.equalsIgnoreCase("admin")) {
            StatusDenuncia novoStatus = StatusDenuncia.valueOf(body.get("status").toString().toUpperCase());
            denuncia.setStatus(novoStatus);
        }

        Denuncia denunciaAtualizada = denunciaRepository.save(denuncia);

        tratarMudancasParaContagemBairro(denunciaAtualizada, statusAntigo, bairroAntigo);

        return denunciaAtualizada;
    }

    public void deletarDenuncia(Long id, Long usuarioId) {
        Denuncia denuncia = denunciaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Denúncia não encontrada"));

        if (!denuncia.getUsuario().getId().equals(usuarioId)) {
            throw new SecurityException("Acesso negado. Somente o criador pode excluir esta denúncia");
        }

        if (isStatusAtivo(denuncia.getStatus())) {
            atualizarContagemBairro(denuncia.getBairro(), false);
        }

        denunciaRepository.delete(denuncia);
    }

    private void tratarMudancasParaContagemBairro(Denuncia denuncia, StatusDenuncia statusAntigo, String bairroAntigo) {
        StatusDenuncia statusNovo = denuncia.getStatus();
        String bairroNovo = denuncia.getBairro();

        boolean mudouBairro = !bairroAntigo.equals(bairroNovo);
        boolean mudouStatus = statusAntigo != statusNovo;

        if (mudouBairro) {
            if (isStatusAtivo(statusAntigo)) {
                atualizarContagemBairro(bairroAntigo, false);
            }
            if (isStatusAtivo(statusNovo)) {
                atualizarContagemBairro(bairroNovo, true);
            }
        } else if (mudouStatus) {
            if (isStatusAtivo(statusAntigo) && !isStatusAtivo(statusNovo)) {
                atualizarContagemBairro(bairroAntigo, false);
            } else if (!isStatusAtivo(statusAntigo) && isStatusAtivo(statusNovo)) {
                atualizarContagemBairro(bairroAntigo, true);
            }
        }
    }

    private void atualizarContagemBairro(String bairro, boolean incrementar) {
        Optional<Local> localOpt = localRepository.findByBairro(bairro);
        Local local = localOpt.orElseGet(() -> {
            Local novoLocal = new Local();
            novoLocal.setBairro(bairro);
            return novoLocal;
        });

        if (incrementar) {
            local.incrementarQuantidade();
        } else {
            local.decrementarQuantidade();
        }

        localRepository.save(local);
    }

    private boolean isStatusAtivo(StatusDenuncia status) {
        return status == StatusDenuncia.DENUNCIADO || status == StatusDenuncia.EM_ANDAMENTO;
    }
}