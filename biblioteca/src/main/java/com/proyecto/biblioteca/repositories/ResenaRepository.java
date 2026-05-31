package com.proyecto.biblioteca.repositories;

import com.proyecto.biblioteca.models.Resena;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ResenaRepository extends JpaRepository<Resena, Long> {

    List<Resena> findByLibroId(Long libroId);

    List<Resena> findByUsuarioId(Long usuarioId);
}