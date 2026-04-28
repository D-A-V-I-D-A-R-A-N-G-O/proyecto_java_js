package com.proyecto.biblioteca.services;

import com.proyecto.biblioteca.repositories.libroRepositories;
import com.proyecto.biblioteca.models.libros;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class libroService {
    private final libroRepositories libroRepo;
    @Autowired

    public libroService(libroService libroRepo){
        this.libroRepo = (libroRepositories) libroRepo;
    }

    public void crearLibro(libros libro){
        libroRepo.save(libro);
    }
    public void actualizarLibro(libros libro){
        libroRepo.save(libro);
    }
    public void eliminarLibro(Long id){
        libroRepo.deleteById(id);
    }
    public List<libros> listarLibros(){
        return libroRepo.findAll();
    }

    public Optional<libros> buscarPorId(Long id){
        return libroRepo.findById(id);
    }

    List<libros> buscarPorTitulo(String titulo){
        return libroRepo.findByTitulo(titulo);
    }
    List<libros> buscarPorAutor(String autor){
        return libroRepo.findByAutor(autor);
    }
}
