package com.proyecto.biblioteca.repositories;

import com.proyecto.biblioteca.models.usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface usuarioRepositories
        extends JpaRepository<usuario, Long> {

    Optional<usuario> findByNombreAndContrasena(
            String nombre,
            String contrasena
    );
    
}