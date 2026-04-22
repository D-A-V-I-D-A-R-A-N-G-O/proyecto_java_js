package com.proyecto.biblioteca.repositories;

import com.proyecto.biblioteca.models.prestamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface prestamoRepositories extends JpaRepository<prestamo, Long> {
    List<prestamo> findByIdLibro(Long idLibro);
    List<prestamo> findByIdUsuario(Long idUsuario);
}
