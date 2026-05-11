package com.proyecto.biblioteca.controllers;

import com.proyecto.biblioteca.services.prestamoService;
import com.proyecto.biblioteca.models.prestamo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prestamos")
public class prestamoController {

    private final prestamoService service;

    public prestamoController(prestamoService service) {
        this.service = service;
    }

    @GetMapping
    public List<prestamo> listar() {
        return service.listar();
    }

    @PostMapping
    public prestamo guardar(@RequestBody prestamo p) {
        return service.guardar(p);
    }

    @GetMapping("/buscarPorUsuario/{id}")
    public ResponseEntity<List<prestamo>> buscarPorUsuario(@PathVariable Long id) {
        List<prestamo> libros = service.obtenerPorUsuario(id);
        return ResponseEntity.ok(libros);
    }
    @GetMapping("/buscarPorLibro/{id}")
    public ResponseEntity<List<prestamo>> buscarPorLibro(@PathVariable Long id) {
        List<prestamo> libros = service.obtenerPorLibro(id);
        return ResponseEntity.ok(libros);
    }
}
