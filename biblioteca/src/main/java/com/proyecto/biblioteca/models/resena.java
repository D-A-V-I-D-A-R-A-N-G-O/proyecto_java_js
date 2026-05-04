package com.proyecto.biblioteca.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "resena")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class resena {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idResena;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_libro", nullable = false)
    private libros libro;

    private int puntuacion;
    private String comentario;
}