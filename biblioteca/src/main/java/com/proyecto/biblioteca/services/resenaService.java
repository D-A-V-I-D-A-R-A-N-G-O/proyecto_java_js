package com.proyecto.biblioteca.services;

import com.proyecto.biblioteca.models.resena;
import com.proyecto.biblioteca.repositories.resenaRepositories;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class resenaService {

    private final resenaRepositories repo;

    public resenaService(resenaRepositories repo) {
        this.repo = repo;
    }

    public List<resena> listar() {
        return repo.findAll();
    }

    public resena guardar(resena r) {
        return repo.save(r);
    }
}