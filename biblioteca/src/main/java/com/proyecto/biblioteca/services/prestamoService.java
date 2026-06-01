package com.proyecto.biblioteca.services;

import com.proyecto.biblioteca.models.Prestamo;
import com.proyecto.biblioteca.models.Libro;
import com.proyecto.biblioteca.repositories.PrestamoRepository;
import com.proyecto.biblioteca.repositories.LibroRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PrestamoService {

    private final PrestamoRepository repository;
    private final LibroRepository libroRepository;

    public PrestamoService(PrestamoRepository repository, LibroRepository libroRepository) {
        this.repository = repository;
        this.libroRepository = libroRepository;
    }

    public List<Prestamo> listar() {
        return repository.findAll();
    }

    public Prestamo guardar(Prestamo prestamo) {
        // Validar que el libro no está prestado actualmente
        Long libroId = prestamo.getLibro().getId();
        List<Prestamo> prestamosActivos = repository.findByLibroIdAndFechaDevolucionIsNull(libroId);

        if (!prestamosActivos.isEmpty()) {
            throw new RuntimeException("El libro ya está prestado y no puede ser prestado nuevamente");
        }

        prestamo.setFechaCreacion(LocalDateTime.now());
        prestamo.setFechaPrestamo(LocalDateTime.now());

        // Guardar el préstamo
        Prestamo prestamGuardado = repository.save(prestamo);

        // Marcar el libro como ocupado
        Libro libro = prestamo.getLibro();
        libro.setEstado(false);
        libroRepository.save(libro);

        return prestamGuardado;
    }

    public List<Prestamo> obtenerPorUsuario(Long usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }

    public List<Prestamo> obtenerPorLibro(Long libroId) {
        return repository.findByLibroId(libroId);
    }

    public List<Prestamo> obtenerPrestamosActivos() {
        return repository.findByFechaDevolucionIsNull();
    }

    public void marcarComoDevuelto(Long prestamoId) {
        Prestamo prestamo = repository.findById(prestamoId)
                .orElseThrow(() -> new RuntimeException("Préstamo no encontrado"));

        prestamo.setFechaDevolucion(LocalDateTime.now());
        repository.save(prestamo);

        // Marcar el libro como disponible
        Libro libro = prestamo.getLibro();
        libro.setEstado(true);
        libroRepository.save(libro);
    }
}