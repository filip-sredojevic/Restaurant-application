package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.RezervacijaRepoInterface;
import com.example.backend.models.Rezervacija;
@RestController
@RequestMapping("/rezervacije")
@CrossOrigin(origins = "http://localhost:4200")
public class RezervacijaContoller {

    @GetMapping("/dohvatisverezervacije")
    public List<Rezervacija> dohvSveRezerv(){
              return new RezervacijaRepoInterface().dohatiSveRezervacije();
    }
        
  
    @GetMapping("/dohvatisvekomentarerestorana/{id}")
    public List<String> dohvSveKomRestorana(@PathVariable int id) {
        return new RezervacijaRepoInterface().dohvSveKomentareRestorana(id);
    }

    @PostMapping("/dodajrezervaciju")
    public boolean dodajrezervaciju(@RequestBody Rezervacija rez) {
        return new RezervacijaRepoInterface().dodajRezervaciju(rez);
    }

    @GetMapping("/dohvsverezervacijerestorana/{res}")
    public List<Rezervacija> dohatiSveRezervacijeRestorana(@PathVariable int res) {
        return new RezervacijaRepoInterface().dohatiSveRezervacijeRestorana(res);
    }
    
    @PostMapping("/prihvatirezervaciju")
    public boolean prihvatirezervaciju(@RequestBody Rezervacija rez) {
        return new RezervacijaRepoInterface().prihvatiRezervaciju(rez);
    }

    @PostMapping("/prihvatirezervacijusastolom")
    public boolean prihvatiRezervacijuSaStolom(@RequestBody Rezervacija rez) {
      return new RezervacijaRepoInterface().prihvatiRezervacijuSaStolom(rez);
     
    }

    @PostMapping("/odbijrezervaciju")
    public boolean odbijrezervaciju(@RequestBody Rezervacija rez) {
        return new RezervacijaRepoInterface().odbijRezervaciju(rez);
    }
    @PostMapping("/ocenirezervaciju")
    public boolean ocenirezervaciju(@RequestBody Rezervacija rez) {
        return new RezervacijaRepoInterface().oceniRezervaciju(rez);
    }
    @GetMapping("/otkazirezervaciju/{idrez}")
    public boolean otkazirezervaciju(@PathVariable int idrez) {
        return new RezervacijaRepoInterface().otkaziRezervaciju(idrez);
    }

    @GetMapping("/prisustvovaorezervaciji/{idrez}")
    public boolean prisustovaorezervaciji(@PathVariable int idrez) {
        return new RezervacijaRepoInterface().prijaviDolazak(idrez);
    }

    @GetMapping("/produzirezervaciju/{idrez}")
    public boolean produzirezervaciju(@PathVariable int idrez) {
        return new RezervacijaRepoInterface().produziRezervaciju(idrez);
    }
    
    
}
