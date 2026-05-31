package com.proyecto.biblioteca.controllers;

import com.proyecto.biblioteca.models.Prestamo;
import com.proyecto.biblioteca.services.PrestamoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prestamos")
public class PrestamoController {

    private final PrestamoService service;

    public PrestamoController(PrestamoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Prestamo> listar() {
        return service.listar();
    }

    @PostMapping
    public ResponseEntity<Prestamo> guardar(@RequestBody Prestamo prestamo) {
        return ResponseEntity.ok(service.guardar(prestamo));
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<Prestamo>> obtenerPorUsuario(@PathVariable Long id) {
        List<Prestamo> prestamos = service.obtenerPorUsuario(id);
        return ResponseEntity.ok(prestamos);
    }

    @GetMapping("/libro/{id}")
    public ResponseEntity<List<Prestamo>> obtenerPorLibro(@PathVariable Long id) {
        List<Prestamo> prestamos = service.obtenerPorLibro(id);
        return ResponseEntity.ok(prestamos);
    }

    @GetMapping("/activos")
    public ResponseEntity<List<Prestamo>> obtenerActivos() {
        List<Prestamo> prestamos = service.obtenerPrestamosActivos();
        return ResponseEntity.ok(prestamos);
    }
}
