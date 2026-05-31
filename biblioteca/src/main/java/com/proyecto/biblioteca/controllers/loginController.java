package com.proyecto.biblioteca.controllers;

import com.proyecto.biblioteca.models.Usuario;
import com.proyecto.biblioteca.repositories.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    private final UsuarioRepository usuarioRepository;

    public LoginController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> datos) {
        String nombre = datos.get("nombre");
        String contrasena = datos.get("contrasena");

        if (nombre == null || contrasena == null) {
            Map<String, String> error = new HashMap<>();
            error.put("mensaje", "Nombre y contraseña son requeridos");
            return ResponseEntity.badRequest().body(error);
        }

        Optional<Usuario> usuarioOptional = usuarioRepository
                .findByNombreAndContrasena(nombre, contrasena);

        if (usuarioOptional.isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("mensaje", "Credenciales incorrectas");
            return ResponseEntity.badRequest().body(error);
        }

        return ResponseEntity.ok(usuarioOptional.get());
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        Map<String, String> respuesta = new HashMap<>();
        respuesta.put("mensaje", "Sesión cerrada correctamente");
        return ResponseEntity.ok(respuesta);
    }
}