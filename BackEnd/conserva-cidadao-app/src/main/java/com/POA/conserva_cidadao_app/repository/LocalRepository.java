package com.POA.conserva_cidadao_app.repository;

import com.POA.conserva_cidadao_app.model.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface LocalRepository extends JpaRepository<Local, Long> {
    Optional<Local> findByBairro(String bairro);

    @Query(value = "SELECT * FROM locais ORDER BY quantidade_denuncias_ativas DESC LIMIT 5", nativeQuery = true)
    List<Local> findLocais();
}