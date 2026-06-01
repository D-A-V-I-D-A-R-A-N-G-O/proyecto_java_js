package com.proyecto.biblioteca.controllers;

import com.proyecto.biblioteca.models.Usuario;
import com.proyecto.biblioteca.repositories.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
    private final UsuarioRepository usuarioRepository;

    public LoginController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> datos) {
        try {
            String nombre = datos.get("nombre");
            String contrasena = datos.get("contrasena");

            logger.info("Intento de login para usuario: {}", nombre);

            if (nombre == null || nombre.trim().isEmpty() ||
                contrasena == null || contrasena.trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("mensaje", "Nombre y contraseña son requeridos");
                return ResponseEntity.badRequest().body(error);
            }

            logger.debug("Buscando usuario en base de datos...");
            Optional<Usuario> usuarioOptional = usuarioRepository
                    .findByNombreAndContrasena(nombre.trim(), contrasena.trim());

            if (usuarioOptional.isEmpty()) {
                logger.warn("Usuario o contraseña incorrectos para: {}", nombre);
                Map<String, String> error = new HashMap<>();
                error.put("mensaje", "Credenciales incorrectas");
                return ResponseEntity.badRequest().body(error);
            }

            Usuario usuario = usuarioOptional.get();
            logger.info("Login exitoso para usuario: {} con rol: {}", nombre, usuario.getRol());
            return ResponseEntity.ok(usuario);

        } catch (Exception e) {
            logger.error("Error en login: ", e);
            Map<String, Object> error = new HashMap<>();
            error.put("mensaje", "Error al procesar login");
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        Map<String, String> respuesta = new HashMap<>();
        respuesta.put("mensaje", "Sesión cerrada correctamente");
        return ResponseEntity.ok(respuesta);
    }

    @GetMapping("/health")
    public ResponseEntity<?> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "OK");
        response.put("servicio", "API Biblioteca - Funcionando correctamente");
        return ResponseEntity.ok(response);
    }
}