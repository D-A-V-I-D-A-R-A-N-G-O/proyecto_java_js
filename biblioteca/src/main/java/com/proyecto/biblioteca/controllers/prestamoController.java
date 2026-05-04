package com.proyecto.biblioteca.controllers;

import com.proyecto.biblioteca.models.prestamo;
import com.proyecto.biblioteca.services.prestamoService;
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
}