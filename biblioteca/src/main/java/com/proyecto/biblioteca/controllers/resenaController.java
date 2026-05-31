package com.proyecto.biblioteca.controllers;

import com.proyecto.biblioteca.models.Resena;
import com.proyecto.biblioteca.services.ResenaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/resenas")
public class ResenaController {

    private final ResenaService service;

    public ResenaController(ResenaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Resena> listar() {
        return service.listar();
    }

    @PostMapping
    public ResponseEntity<Resena> guardar(@Valid @RequestBody Resena resena) {
        return ResponseEntity.ok(service.guardar(resena));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resena> obtenerPorId(@PathVariable Long id) {
        Optional<Resena> resena = service.obtenerPorId(id);
        return resena.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/libro/{id}")
    public ResponseEntity<List<Resena>> obtenerPorLibro(@PathVariable Long id) {
        List<Resena> resenas = service.obtenerPorLibro(id);
        return ResponseEntity.ok(resenas);
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<Resena>> obtenerPorUsuario(@PathVariable Long id) {
        List<Resena> resenas = service.obtenerPorUsuario(id);
        return ResponseEntity.ok(resenas);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Resena> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Resena resena
    ) {
        try {
            Resena resenaActualizada = service.actualizar(id, resena);
            return ResponseEntity.ok(resenaActualizada);
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