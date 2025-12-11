package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.ZahteviRepo;
import com.example.backend.models.Korisnik;

@RestController
@RequestMapping("/zahtevi")
@CrossOrigin(origins = "http://localhost:4200")
public class ZahteviController {


    @GetMapping("/dohvsvezahteve")
    public List<Korisnik> dohvatiSveZahteve(){
         return new ZahteviRepo().dohvatiSveZahteve(); 
    }  
    
}
