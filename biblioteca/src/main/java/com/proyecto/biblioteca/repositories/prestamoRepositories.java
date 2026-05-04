package com.proyecto.biblioteca.repositories;

import com.proyecto.biblioteca.models.prestamo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface prestamoRepositories extends JpaRepository<prestamo, Long> {

    List<prestamo> findByLibro_IdLibro(Long idLibro);

    List<prestamo> findByUsuario_IdUsuario(Long idUsuario);
}