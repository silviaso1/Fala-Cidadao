package com.POA.conserva_cidadao_app.repository;

import com.POA.conserva_cidadao_app.model.Denuncia;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DenunciaRepository extends JpaRepository<Denuncia, Long> {
    List<Denuncia> findAll();
}