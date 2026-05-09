package com.proyecto.biblioteca.repositories;

import com.proyecto.biblioteca.models.usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface usuarioRepositories extends JpaRepository<usuario, Long> {

    Optional<usuario> findByNombre(String nombre);
}