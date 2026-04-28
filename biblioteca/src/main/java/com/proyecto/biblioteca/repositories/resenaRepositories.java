package com.proyecto.biblioteca.repositories;

import com.proyecto.biblioteca.models.resena;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface resenaRepositories extends JpaRepository<resena, Long> {
    List<resena> findByIdLibro(Long idLibro);
    List<resena> findByIdUsuario(Long idUsuario);
}