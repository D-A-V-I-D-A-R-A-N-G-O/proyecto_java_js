package com.proyecto.biblioteca.services;

import com.proyecto.biblioteca.models.resena;
import com.proyecto.biblioteca.repositories.resenaRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class resenaService {
    private final resenaRepositories resenaRepo;
    @Autowired

    public resenaService(resenaService resenaRepo){
        this.resenaRepo = (resenaRepositories) resenaRepo;
    }
    public void crearResena(resena resenas){resenaRepo.save(resenas);
    }
    public void eliminarResena(Long id){
        resenaRepo.deleteById(id);
    }

    public List<resena> listarResenas(){
        return resenaRepo.findAll();
    }
    List<resena> buscarPorLibro(Long idLibro){
        return resenaRepo.findByIdLibro(idLibro);
    }


}
