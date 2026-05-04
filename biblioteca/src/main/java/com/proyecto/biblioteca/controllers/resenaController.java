package com.proyecto.biblioteca.controllers;

import com.proyecto.biblioteca.models.resena;
import com.proyecto.biblioteca.services.resenaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resenas")
public class resenaController {

    private final resenaService service;

    public resenaController(resenaService service) {
        this.service = service;
    }

    @GetMapping
    public List<resena> listar() {
        return service.listar();
    }

    @PostMapping
    public resena guardar(@RequestBody resena r) {
        return service.guardar(r);
    }
}