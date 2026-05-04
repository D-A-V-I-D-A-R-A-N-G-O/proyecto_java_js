package com.proyecto.biblioteca.controllers;

import com.proyecto.biblioteca.models.libros;
import com.proyecto.biblioteca.services.librosService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/libros")
public class librosController {

    private final librosService service;

    public librosController(librosService service) {
        this.service = service;
    }

    @GetMapping
    public List<libros> listar() {
        return service.listar();
    }

    @PostMapping
    public libros guardar(@RequestBody libros libro) {
        return service.guardar(libro);
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<libros>> obtenerLibro(@PathVariable Long id) {
        Optional<libros> libro = service.obtenerPorId(id);
        return ResponseEntity.ok(libro);
    }
    @GetMapping("/buscar")
    public ResponseEntity<List<libros>> buscarPorTitulo(@RequestParam String titulo) {
        List<libros> libros = service.obtenerPorTitulo(titulo);
        return ResponseEntity.ok(libros);
    }
}