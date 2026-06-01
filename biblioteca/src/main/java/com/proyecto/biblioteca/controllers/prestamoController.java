package com.proyecto.biblioteca.controllers;

import com.proyecto.biblioteca.models.Prestamo;
import com.proyecto.biblioteca.services.PrestamoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<?> guardar(@RequestBody Prestamo prestamo) {
        try {
            Prestamo prestamoGuardado = service.guardar(prestamo);
            return ResponseEntity.ok(prestamoGuardado);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
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

    @PutMapping("/{id}/devolver")
    public ResponseEntity<?> marcarComoDevuelto(@PathVariable Long id) {
        try {
            service.marcarComoDevuelto(id);
            Map<String, String> respuesta = new HashMap<>();
            respuesta.put("mensaje", "Préstamo marcado como devuelto");
            return ResponseEntity.ok(respuesta);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
