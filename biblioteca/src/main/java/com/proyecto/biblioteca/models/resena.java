package com.proyecto.biblioteca.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity
public class resena {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long idResena;
    @Column(name = "id_usuario", nullable = false)
    private String idUsuario;
    @Column(name = "id_libro", nullable = false)
    private String idLibro;
    @Column(name = "puntuacion", nullable = false)
    private String puntuacion;
    @Column(name = "resena", nullable = false)
    private String resena;

    public resena() {

    }
}