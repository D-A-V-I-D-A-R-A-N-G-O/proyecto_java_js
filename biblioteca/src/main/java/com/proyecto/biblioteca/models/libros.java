package com.proyecto.biblioteca.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "libro")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class libros {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLibro;

    private String titulo;
    private String autor;
    private String sinopsis;
    private boolean estado;
}