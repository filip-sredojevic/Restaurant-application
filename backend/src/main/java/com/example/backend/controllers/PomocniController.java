package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.PomocniRepoInterface;
import com.example.backend.models.Dostava;
import com.example.backend.models.Korisnik;
import com.example.backend.models.Rezervacija;

@RestController
@RequestMapping("/pomocni")
@CrossOrigin(origins = "http://localhost:4200")
public class PomocniController {

    @GetMapping("/dohvatisvezahteve")
    public List<String> dohvatisvezahteve(){
        return new PomocniRepoInterface().dohvatiSvaKorImena();
    }


    @PostMapping("/prihvatizahtev")
    public boolean prihvatiZahtev(@RequestBody Korisnik zahtev){
        return new PomocniRepoInterface().prihvatiZahtev(zahtev);
    }

    @PostMapping("/odbijzahtev")
    public boolean odbijZahtev(@RequestBody Korisnik zahtev){
        return new PomocniRepoInterface().odbijZahtev(zahtev);


    }

    @GetMapping("/dohvatisveodbijenemejladrese")
    public List<String> dohvatisveodbijenemejladrese(){
        return new PomocniRepoInterface().dohvatiSveOdbijeneMejlAdrese();
    }
    @PostMapping("/prijavinedolazak")
    public boolean prijavinedolazak(@RequestBody Rezervacija rez){
        return new PomocniRepoInterface().prijaviNeDolazak(rez);
    }
    @PostMapping("/dodajdostavu")
    public boolean dodajdostavu(@RequestBody Dostava dostava) {
        return new PomocniRepoInterface().dodajDostavu(dostava);
    }
    
}
