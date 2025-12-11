package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.RestoranRepoInterface;
import com.example.backend.models.Restoran;

@RestController
@RequestMapping("/restorani")
@CrossOrigin(origins = "http://localhost:4200")
public class RestoranController {

    @PostMapping("/dodajrestoran")
    public boolean dodajrestoran(@RequestBody Restoran restoran){
        return new RestoranRepoInterface().dodajRestoran(restoran);
    }

    @GetMapping("/dohvsverestorane")
    public List<Restoran> dohvatisverestorane() {
      
        return new RestoranRepoInterface().dohvatisverestorane();
    }

    @GetMapping("/dohvatibrojrestorana")
    public int dohvatibrojrestorana() {
        return new RestoranRepoInterface().dovatiBrojRestorana();
    }
    @GetMapping("/dohvatirestoran/{id}")
    public Restoran dohvatirestoran(@PathVariable int id) {
           return new RestoranRepoInterface().dohvatirestoran(id);
    }
   
    
}
