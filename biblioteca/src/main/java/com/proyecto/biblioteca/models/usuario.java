package com.proyecto.biblioteca.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity
public class usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long idUsuario;
    @Column(name = "nombre", nullable = false)
    private String nombre;
    @Column(name = "contrasena", nullable = false)
    private String contrasena;
    @Column(name = "celular", nullable = false)
    private String celular;

    public usuario() {

    }
}
