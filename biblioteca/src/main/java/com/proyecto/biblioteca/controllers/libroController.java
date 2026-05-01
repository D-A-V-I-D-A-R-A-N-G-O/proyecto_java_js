package com.proyecto.biblioteca.controllers;

import com.proyecto.biblioteca.models.libros;
import com.proyecto.biblioteca.services.libroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/libros")
public class libroController {
    private final libroService libroService;

    @Autowired

    public libroController(libroService libroService) {
        this.libroService = libroService;
    }
    @PostMapping(value = "crear", headers = "Accept=aplication/json")
    public void crearLibro(@RequestBody libros libro){
        libroService.crearLibro(libro);
    }
    @GetMapping(value = "listar", headers = "Accept=application/json")
    public List<libros> listarLibros(){
        return libroService.listarLibros();
    }
    @GetMapping(value = "listarPorId/{id}", headers = "Accept = application/json")
    public Optional<libros> buscarPorId(@PathVariable Long id){
        return libroService.buscarPorId(id);
    }
}
