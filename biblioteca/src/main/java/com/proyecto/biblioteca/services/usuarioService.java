package com.proyecto.biblioteca.services;

import com.proyecto.biblioteca.models.usuario;
import com.proyecto.biblioteca.repositories.usuarioRepositories;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class usuarioService {

    private final usuarioRepositories repository;

    public usuarioService(usuarioRepositories repository) {
        this.repository = repository;
    }

    public List<usuario> listar() {
        return repository.findAll();
    }

    public usuario guardar(usuario user) {
        return repository.save(user);
    }

    public Optional<usuario> obtenerPorId(Long id){
        return repository.findById(id);
    }

    public void eliminar(Long id){
        repository.deleteById(id);
    }

    public Optional<usuario> login(
            String nombre,
            String contrasena
    ){
        return repository.findByNombreAndContrasena(
                nombre,
                contrasena
        );
    }
}