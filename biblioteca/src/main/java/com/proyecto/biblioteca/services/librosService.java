package com.proyecto.biblioteca.services;

import com.proyecto.biblioteca.models.libros;
import com.proyecto.biblioteca.repositories.librosRepositories;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class librosService {

    private final librosRepositories repo;

    public librosService(librosRepositories repo) {
        this.repo = repo;
    }

    public List<libros> listar() {
        return repo.findAll();
    }
    public Optional<libros> obtenerPorId(Long id) {
        return repo.findById(id);
    }
    public List<libros> obtenerPorTitulo(String titulo){
        return repo.findByTituloContainingIgnoreCase(titulo);
    }
    public libros guardar(libros libro) {
        return repo.save(libro);
    }

}