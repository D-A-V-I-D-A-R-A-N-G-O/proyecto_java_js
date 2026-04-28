package com.proyecto.biblioteca.services;

import com.proyecto.biblioteca.models.usuario;
import com.proyecto.biblioteca.repositories.usuarioRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class usuarioService {
    private final usuarioRepositories usuarioRepo;
    @Autowired

    public usuarioService(usuarioService usuarioRepo){
        this.usuarioRepo = (usuarioRepositories) usuarioRepo;
    }

    public void crearUsuario(usuario usuario){usuarioRepo.save(usuario);
    }
    public void actualizarUsuario(usuario libro){
        usuarioRepo.save(libro);
    }

    public void eliminarUsuario(Long id){
        usuarioRepo.deleteById(id);
    }
    public List<usuario> listarUsuario(){
        return usuarioRepo.findAll();
    }

    Optional<usuario> buscarPorId(Long id){
        return usuarioRepo.findById(id);
    }
    List<usuario> buscarPorNombre(String nombre){
        return usuarioRepo.findByNombre(nombre);
    }

}
