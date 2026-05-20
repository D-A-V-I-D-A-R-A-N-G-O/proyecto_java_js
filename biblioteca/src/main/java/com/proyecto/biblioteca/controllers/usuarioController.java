package com.proyecto.biblioteca.controllers;

import com.proyecto.biblioteca.models.usuario;
import com.proyecto.biblioteca.services.usuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class usuarioController {

    private final usuarioService service;

    public usuarioController(usuarioService service) {
        this.service = service;
    }

    // LISTAR
    @GetMapping
    public List<usuario> listar() {
        return service.listar();
    }

    // GUARDAR
    @PostMapping
    public usuario guardar(@RequestBody usuario user) {
        return service.guardar(user);
    }

    // OBTENER POR ID
    @GetMapping("/{id}")
    public ResponseEntity<usuario> obtenerPorId(
            @PathVariable Long id
    ){

        Optional<usuario> usuario =
                service.obtenerPorId(id);

        return usuario.map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build());
    }

    // ACTUALIZAR
    @PutMapping("/{id}")
    public ResponseEntity<usuario> actualizar(
            @PathVariable Long id,
            @RequestBody usuario user
    ){

        Optional<usuario> usuarioExistente =
                service.obtenerPorId(id);

        if(usuarioExistente.isPresent()){

            usuario usuarioActual =
                    usuarioExistente.get();

            usuarioActual.setNombre(user.getNombre());
            usuarioActual.setContrasena(
                    user.getContrasena()
            );
            usuarioActual.setCelular(
                    user.getCelular()
            );
            usuarioActual.setRol(user.getRol());

            usuario actualizado =
                    service.guardar(usuarioActual);

            return ResponseEntity.ok(actualizado);
        }

        return ResponseEntity.notFound().build();
    }

    // ELIMINAR
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id
    ){

        Optional<usuario> usuario =
                service.obtenerPorId(id);

        if(usuario.isPresent()){

            service.eliminar(id);

            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

    // LOGIN
    @GetMapping("/login")
    public ResponseEntity<usuario> login(

            @RequestParam String nombre,
            @RequestParam String contrasena
    ){

        Optional<usuario> usuario =
                service.login(
                        nombre,
                        contrasena
                );

        return usuario.map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build());
    }
}