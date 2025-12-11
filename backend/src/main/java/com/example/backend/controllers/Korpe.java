package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.KorpeRepoInterface;
import com.example.backend.models.Korpa;

@RestController
@RequestMapping("/korpe")
@CrossOrigin(origins = "http://localhost:4200")
public class Korpe {
    
    @PostMapping("/dodajukorpu")
    public boolean dodajuKorpu(@RequestBody Korpa k) {
           return new KorpeRepoInterface().dodajKorpu(k);
    }
    @GetMapping("/dohvatikorpugosta/{idgost}/{idres}")
    public List<Korpa> dohvatikorpuGosta(@PathVariable String idgost, @PathVariable int idres) {
        return new KorpeRepoInterface().dohvatikorpuGosta(idgost, idres);
    }
    @PostMapping("/uklonikopru")
    public List<Korpa> uklonikorpuGosta(@RequestBody Korpa korpa) {
        return new KorpeRepoInterface().uklonikorpu(korpa);
    }
    
}
