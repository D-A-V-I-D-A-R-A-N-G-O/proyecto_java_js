package com.proyecto.biblioteca.services;

import com.proyecto.biblioteca.models.usuario;
import com.proyecto.biblioteca.repositories.usuarioRepositories;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class usuarioService {

    private final usuarioRepositories repo;

    public usuarioService(usuarioRepositories repo) {
        this.repo = repo;
    }

    public List<usuario> listar() {
        return repo.findAll();
    }

    public usuario guardar(usuario user) {
        return repo.save(user);
    }
}