package com.proyecto.biblioteca.repositories;

import com.proyecto.biblioteca.models.libros;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface librosRepositories extends JpaRepository<libros, Long> {


    List<libros> findByTituloContainingIgnoreCase(String titulo);
}