package com.proyecto.biblioteca.repositories;

import com.proyecto.biblioteca.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByNombreAndContrasena(String nombre, String contrasena);

    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findByNombre(String nombre);
}