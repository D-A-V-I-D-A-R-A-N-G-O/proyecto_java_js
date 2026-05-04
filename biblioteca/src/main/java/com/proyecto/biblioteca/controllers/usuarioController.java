package com.proyecto.biblioteca.controllers;

import com.proyecto.biblioteca.models.usuario;
import com.proyecto.biblioteca.services.usuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class usuarioController {

    private final usuarioService service;

    public usuarioController(usuarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<usuario> listar() {
        return service.listar();
    }

    @PostMapping
    public usuario guardar(@RequestBody usuario user) {
        return service.guardar(user);
    }
}