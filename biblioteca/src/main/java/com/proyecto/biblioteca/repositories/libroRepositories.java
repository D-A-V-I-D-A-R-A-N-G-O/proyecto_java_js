package com.proyecto.biblioteca.repositories;

import com.proyecto.biblioteca.models.libros;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface libroRepositories extends JpaRepository<libros, Long> {
    List<libros> findByTitulo(String titulo);
    List<libros> findByAutor(String autor);
}
