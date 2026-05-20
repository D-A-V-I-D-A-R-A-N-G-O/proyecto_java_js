package com.proyecto.biblioteca.controllers;

import com.proyecto.biblioteca.models.libros;
import com.proyecto.biblioteca.services.librosService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/libros")
@CrossOrigin("*")
public class librosController {

    private final librosService service;

    public librosController(librosService service) {
        this.service = service;
    }

    // LISTAR TODOS
    @GetMapping
    public List<libros> listar() {
        return service.listar();
    }

    // CREAR
    @PostMapping
    public libros guardar(@RequestBody libros libro) {
        return service.guardar(libro);
    }

    // OBTENER POR ID
    @GetMapping("/id/{id}")
    public ResponseEntity<?> obtenerLibro(@PathVariable Long id) {

        Optional<libros> libro = service.obtenerPorId(id);

        if(libro.isPresent()) {
            return ResponseEntity.ok(libro.get());
        }

        return ResponseEntity.notFound().build();
    }

    // BUSCAR POR TITULO
    @GetMapping("/buscar")
    public ResponseEntity<List<libros>> buscarPorTitulo(
            @RequestParam String titulo
    ) {

        List<libros> libros = service.obtenerPorTitulo(titulo);

        return ResponseEntity.ok(libros);
    }

    // EDITAR
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(
            @PathVariable Long id,
            @RequestBody libros libro
    ) {

        libros libroActualizado = service.actualizar(id, libro);

        if(libroActualizado != null) {
            return ResponseEntity.ok(libroActualizado);
        }

        return ResponseEntity.notFound().build();
    }

    // ELIMINAR
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {

        boolean eliminado = service.eliminar(id);

        if(eliminado) {
            return ResponseEntity.ok("Libro eliminado");
        }

        return ResponseEntity.notFound().build();
    }
}