package com.proyecto.biblioteca.controllers;

import com.proyecto.biblioteca.services.prestamoService;
import com.proyecto.biblioteca.models.prestamo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<Optional<prestamo>> obtenerLibro(@PathVariable Long id) {
        List<prestamo> prestamo = service.obtenerPorUsuario(id);
        return ResponseEntity.ok(prestamo);
    }
}