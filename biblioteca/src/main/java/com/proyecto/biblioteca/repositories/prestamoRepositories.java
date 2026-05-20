package com.proyecto.biblioteca.repositories;

import com.proyecto.biblioteca.models.prestamo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface prestamoRepositories extends JpaRepository<prestamo, Long> {

    List<prestamo> findByIdLibro(Long idLibro);

    List<prestamo> findByIdUsuario(Long idUsuario);

    List<prestamo> findByUsuario_IdUsuario(Long id);

    List<prestamo> findByLibro_IdLibro(Long id);
}