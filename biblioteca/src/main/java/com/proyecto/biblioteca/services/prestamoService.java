package com.proyecto.biblioteca.services;

import com.proyecto.biblioteca.models.prestamo;
import com.proyecto.biblioteca.repositories.prestamoRepositories;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class prestamoService {

    private final prestamoRepositories repo;

    public prestamoService(prestamoRepositories repo) {
        this.repo = repo;
    }

    public List<prestamo> listar() {
        return repo.findAll();
    }

    public prestamo guardar(prestamo p) {
        return repo.save(p);
    }
}