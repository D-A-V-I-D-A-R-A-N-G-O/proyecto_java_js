package com.proyecto.biblioteca.services;

import com.proyecto.biblioteca.models.Prestamo;
import com.proyecto.biblioteca.repositories.PrestamoRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PrestamoService {

    private final PrestamoRepository repository;

    public PrestamoService(PrestamoRepository repository) {
        this.repository = repository;
    }

    public List<Prestamo> listar() {
        return repository.findAll();
    }

    public Prestamo guardar(Prestamo prestamo) {
        prestamo.setFechaCreacion(LocalDateTime.now());
        prestamo.setFechaPrestamo(LocalDateTime.now());
        return repository.save(prestamo);
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
}