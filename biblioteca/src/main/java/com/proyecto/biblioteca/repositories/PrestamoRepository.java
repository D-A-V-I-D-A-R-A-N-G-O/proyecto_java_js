package com.proyecto.biblioteca.repositories;

import com.proyecto.biblioteca.models.Prestamo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PrestamoRepository extends JpaRepository<Prestamo, Long> {

    List<Prestamo> findByUsuarioId(Long usuarioId);

    List<Prestamo> findByLibroId(Long libroId);

    List<Prestamo> findByFechaDevolucionIsNull();

    // Buscar préstamos activos (sin devolución) de un libro específico
    List<Prestamo> findByLibroIdAndFechaDevolucionIsNull(Long libroId);
}