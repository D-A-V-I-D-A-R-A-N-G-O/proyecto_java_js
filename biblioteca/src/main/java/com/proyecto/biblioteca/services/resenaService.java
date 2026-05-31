package com.proyecto.biblioteca.services;

import com.proyecto.biblioteca.models.Resena;
import com.proyecto.biblioteca.repositories.ResenaRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ResenaService {

    private final ResenaRepository repository;

    public ResenaService(ResenaRepository repository) {
        this.repository = repository;
    }

    public List<Resena> listar() {
        return repository.findAll();
    }

    public Resena guardar(Resena resena) {
        resena.setFechaCreacion(LocalDateTime.now());
        return repository.save(resena);
    }

    public Optional<Resena> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public List<Resena> obtenerPorLibro(Long libroId) {
        return repository.findByLibroId(libroId);
    }

    public List<Resena> obtenerPorUsuario(Long usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }

    public Resena actualizar(Long id, Resena resenaActualizada) {
        Optional<Resena> resenaExistente = repository.findById(id);

        if (resenaExistente.isPresent()) {
            Resena resena = resenaExistente.get();
            resena.setPuntuacion(resenaActualizada.getPuntuacion());
            resena.setComentario(resenaActualizada.getComentario());
            resena.setFechaActualizacion(LocalDateTime.now());
            return repository.save(resena);
        }

        throw new RuntimeException("Reseña no encontrada con id: " + id);
    }

    public boolean eliminar(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}