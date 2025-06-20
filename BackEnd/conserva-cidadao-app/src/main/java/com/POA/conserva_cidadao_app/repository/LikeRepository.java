package com.POA.conserva_cidadao_app.repository;

import com.POA.conserva_cidadao_app.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByUsuarioIdAndDenunciaId(Long usuarioId, Long denunciaId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Like l WHERE l.denuncia.id = :denunciaId")
    static void deleteByDenunciaId(Long denunciaId) {

    }
}
