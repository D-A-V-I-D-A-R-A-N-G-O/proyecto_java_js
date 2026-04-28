package com.proyecto.biblioteca.services;

import com.proyecto.biblioteca.models.prestamo;
import com.proyecto.biblioteca.repositories.prestamoRepositories;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class prestamoService {

    private final prestamoRepositories prestamoRepo;

    public prestamoService(prestamoRepositories prestamoRepo) {
        this.prestamoRepo = prestamoRepo;
    }

    // Crear préstamo
    public prestamo crearPrestamo(prestamo prestamo) {
        return prestamoRepo.save(prestamo);
    }

    // Actualizar préstamo
    public prestamo actualizarPrestamo(prestamo prestamo) {
        return prestamoRepo.save(prestamo);
    }

    // Eliminar préstamo
    public void eliminarPrestamo(Long id) {
        prestamoRepo.deleteById(id);
    }

    // Listar todos
    public List<prestamo> listarPrestamos() {
        return prestamoRepo.findAll();
    }

    // Buscar por ID
    public prestamo obtenerPorId(Long id) {
        return prestamoRepo.findById(id).orElse(null);
    }

    // Buscar por libro
    public List<prestamo> obtenerPorLibro(Long idLibro) {
        return prestamoRepo.findByIdLibro(idLibro);
    }

    // Buscar por usuario
    public List<prestamo> obtenerPorUsuario(Long idUsuario) {
        return prestamoRepo.findByIdUsuario(idUsuario);
    }
}