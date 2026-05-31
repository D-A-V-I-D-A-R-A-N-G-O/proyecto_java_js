package com.proyecto.biblioteca.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "libro")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"prestamos", "resenas"})
@EqualsAndHashCode(exclude = {"prestamos", "resenas"})
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El título es requerido")
    @Size(min = 2, max = 255)
    @Column(nullable = false)
    private String titulo;

    @NotBlank(message = "El autor es requerido")
    @Size(min = 2, max = 100)
    @Column(nullable = false)
    private String autor;

    @Size(max = 1000)
    private String sinopsis;

    @Column(nullable = false)
    private boolean estado = true;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;
}