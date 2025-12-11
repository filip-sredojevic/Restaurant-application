package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.JelovnikRepoInterface;
import com.example.backend.models.Jelo;

@RestController
@RequestMapping("/jela")
@CrossOrigin(origins = "http://localhost:4200")
public class Jelovnik {

    @GetMapping("/dohvsvajelarestorana/{idres}")
    public List<Jelo> dohvsvajelarestorana(@PathVariable int idres) {
        return new JelovnikRepoInterface().dohvatiSvaJelaRestorana(idres);
    }
    
}
