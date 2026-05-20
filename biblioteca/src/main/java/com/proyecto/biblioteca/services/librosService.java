package com.proyecto.biblioteca.services;

import com.proyecto.biblioteca.models.libros;
import com.proyecto.biblioteca.repositories.librosRepositories;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class librosService {

    private final librosRepositories repository;

    public librosService(librosRepositories repository) {
        this.repository = repository;
    }

    public List<libros> listar() {
        return repository.findAll();
    }

    public Optional<libros> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public List<libros> obtenerPorTitulo(String titulo) {
        return repository.findByTituloContainingIgnoreCase(titulo);
    }

    public libros guardar(libros libro) {
        return repository.save(libro);
    }

    public libros actualizar(Long id, libros libroActualizado) {

        Optional<libros> libroExistente = repository.findById(id);

        if(libroExistente.isPresent()) {

            libros libro = libroExistente.get();

            libro.setTitulo(libroActualizado.getTitulo());
            libro.setAutor(libroActualizado.getAutor());
            libro.setSinopsis(libroActualizado.getSinopsis());
            libro.setEstado(libroActualizado.isEstado());

            return repository.save(libro);
        }

        return null;
    }

    public boolean eliminar(Long id) {

        Optional<libros> libro = repository.findById(id);

        if(libro.isPresent()) {

            repository.deleteById(id);

            return true;
        }

        return false;
    }
}