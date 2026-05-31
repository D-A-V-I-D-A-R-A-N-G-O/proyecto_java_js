package com.proyecto.biblioteca.controllers;

import com.proyecto.biblioteca.models.Libro;
import com.proyecto.biblioteca.services.LibroService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/libros")
public class LibroController {

    private final LibroService service;

    public LibroController(LibroService service) {
        this.service = service;
    }

    @GetMapping
    public List<Libro> listar() {
        return service.listar();
    }

    @PostMapping
    public ResponseEntity<Libro> guardar(@Valid @RequestBody Libro libro) {
        return ResponseEntity.ok(service.guardar(libro));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Libro> obtenerPorId(@PathVariable Long id) {
        Optional<Libro> libro = service.obtenerPorId(id);
        return libro.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Libro>> buscarPorTitulo(@RequestParam String titulo) {
        List<Libro> libros = service.obtenerPorTitulo(titulo);
        return ResponseEntity.ok(libros);
    }

    @GetMapping("/autor")
    public ResponseEntity<List<Libro>> buscarPorAutor(@RequestParam String autor) {
        List<Libro> libros = service.obtenerPorAutor(autor);
        return ResponseEntity.ok(libros);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Libro> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Libro libro
    ) {
        try {
            Libro libroActualizado = service.actualizar(id, libro);
            return ResponseEntity.ok(libroActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (service.eliminar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}