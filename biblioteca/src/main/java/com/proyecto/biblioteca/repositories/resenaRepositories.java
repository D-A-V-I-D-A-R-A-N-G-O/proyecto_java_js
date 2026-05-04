package com.proyecto.biblioteca.repositories;

import com.proyecto.biblioteca.models.resena;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface resenaRepositories extends JpaRepository<resena, Long> {

    List<resena> findByLibro_IdLibro(Long idLibro);

    List<resena> findByUsuario_IdUsuario(Long idUsuario);
}