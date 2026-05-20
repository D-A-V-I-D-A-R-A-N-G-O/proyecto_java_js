package com.proyecto.biblioteca.controllers;

import com.proyecto.biblioteca.models.usuario;
import com.proyecto.biblioteca.repositories.usuarioRepositories;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class loginController {

    private final usuarioRepositories usuarioRepository;

    public loginController(
            usuarioRepositories usuarioRepository
    ) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> datos
    ) {

        String nombre = datos.get("nombre");
        String contrasena = datos.get("contrasena");

        Optional<usuario> usuarioOptional =

                usuarioRepository
                        .findByNombreAndContrasena(
                                nombre,
                                contrasena
                        );

        if(usuarioOptional.isEmpty()){

            return ResponseEntity
                    .badRequest()
                    .body("Credenciales incorrectas");
        }

        return ResponseEntity.ok(
                usuarioOptional.get()
        );
    }
}