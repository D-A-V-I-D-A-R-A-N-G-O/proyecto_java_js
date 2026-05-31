package com.proyecto.biblioteca.services;

import com.proyecto.biblioteca.models.Libro;
import com.proyecto.biblioteca.repositories.LibroRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LibroService {

    private final LibroRepository repository;

    public LibroService(LibroRepository repository) {
        this.repository = repository;
    }

    public List<Libro> listar() {
        return repository.findAll();
    }

    public Optional<Libro> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public List<Libro> obtenerPorTitulo(String titulo) {
        return repository.findByTituloContainingIgnoreCase(titulo);
    }

    public List<Libro> obtenerPorAutor(String autor) {
        return repository.findByAutorContainingIgnoreCase(autor);
    }

    public Libro guardar(Libro libro) {
        libro.setFechaActualizacion(LocalDateTime.now());
        return repository.save(libro);
    }

    public Libro actualizar(Long id, Libro libroActualizado) {
        Optional<Libro> libroExistente = repository.findById(id);

        if (libroExistente.isPresent()) {
            Libro libro = libroExistente.get();
            libro.setTitulo(libroActualizado.getTitulo());
            libro.setAutor(libroActualizado.getAutor());
            libro.setSinopsis(libroActualizado.getSinopsis());
            libro.setEstado(libroActualizado.isEstado());
            libro.setFechaActualizacion(LocalDateTime.now());
            return repository.save(libro);
        }

        throw new RuntimeException("Libro no encontrado con id: " + id);
    }

    public boolean eliminar(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}