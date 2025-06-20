package com.POA.conserva_cidadao_app.repository;

import com.POA.conserva_cidadao_app.model.Denuncia;
import com.POA.conserva_cidadao_app.model.StatusDenuncia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DenunciaRepository extends JpaRepository<Denuncia, Long> {
    
    List<Denuncia> findAllByOrderByIdDesc();

    @Query("SELECT DISTINCT d.bairro FROM Denuncia d")
    List<String> findAllDistinctBairros();

    @Query("SELECT COUNT(d) FROM Denuncia d WHERE d.bairro = :bairro AND d.status IN :statuses")
    int countByBairroAndStatusIn(@Param("bairro") String bairro,
                                 @Param("statuses") List<StatusDenuncia> statuses);
}