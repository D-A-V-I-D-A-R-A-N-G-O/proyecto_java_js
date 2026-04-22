package com.proyecto.biblioteca.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity
public class libros {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long idLibro;
    @Column(name = "titulo", nullable = false)
    private String titulo;
    @Column(name = "autor", nullable = false)
    private String autor;
    @Column(name = "sinopsis", nullable = false)
    private String sinopsis;
    @Column(name = "estado", nullable = false)
    private boolean estado;

    public libros() {

    }
}
