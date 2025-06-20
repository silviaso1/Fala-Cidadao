package com.POA.conserva_cidadao_app.repository;

import com.POA.conserva_cidadao_app.model.Comentario;
import com.POA.conserva_cidadao_app.model.Denuncia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ComentarioRepository extends JpaRepository<Comentario, Long> {

    List<Comentario> findByDenunciaIdOrderByDataCriacaoDesc(Long denunciaId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Comentario c WHERE c.denuncia.id = :denunciaId")
    static void deleteByDenunciaId(Long denunciaId) {

    }

}

