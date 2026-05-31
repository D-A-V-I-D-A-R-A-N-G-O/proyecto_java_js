package com.proyecto.biblioteca.services;

import com.proyecto.biblioteca.models.Usuario;
import com.proyecto.biblioteca.repositories.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public List<Usuario> listar() {
        return repository.findAll();
    }

    public Usuario guardar(Usuario usuario) {
        usuario.setFechaActualizacion(LocalDateTime.now());
        return repository.save(usuario);
    }

    public Optional<Usuario> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    public Optional<Usuario> login(String nombre, String contrasena) {
        return repository.findByNombreAndContrasena(nombre, contrasena);
    }

    public Optional<Usuario> obtenerPorEmail(String email) {
        return repository.findByEmail(email);
    }

    public Optional<Usuario> obtenerPorNombre(String nombre) {
        return repository.findByNombre(nombre);
    }
}