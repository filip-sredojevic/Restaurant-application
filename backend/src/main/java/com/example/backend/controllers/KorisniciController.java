package com.example.backend.controllers;



import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.KorisniciRepo;
import com.example.backend.models.Korisnik;

@RestController
@RequestMapping("/korisnici")
@CrossOrigin(origins = "http://localhost:4200")
public class KorisniciController {

   
    @GetMapping("/dohvatitelefon/{korime}")
    public String dohvatitelefon(@PathVariable String korime) {
        return new KorisniciRepo().dohvatitelefon(korime);
    }
    @GetMapping("/dohvsvekonres/{idres}")
    public List<Korisnik> dohvatisveKonobareRestorana(@PathVariable int idres) {
        return new KorisniciRepo().dohvKonovareRestorana(idres);
    }
    @PostMapping("/prijava")
    public Korisnik prijava(@RequestBody Korisnik korisnik) {
       
        return new KorisniciRepo().prijava(korisnik);
    }

    

    @PostMapping("/dodajZahtev")
    public boolean dodaavanje_zahteva(@RequestBody Korisnik korisnik){
     //   System.out.println(korisnik.getKorisnicko_ime());
        return new KorisniciRepo().dodavanjeZahteva(korisnik);
    }

    @GetMapping("/dohvatiSveGoste")
    public List<Korisnik> dohvatiSveGoste(){
        return new KorisniciRepo().dohvatiSveGoste();
    }

    @PostMapping("/blokirajgosta")
    public boolean blokiraj(@RequestBody Korisnik gost){
        return new KorisniciRepo().blokirajGosta(gost);
    }

    @PostMapping("/odblokirajgosta")
    public boolean odblokiraj(@RequestBody Korisnik gost){
        return new KorisniciRepo().odblokirajGosta(gost);
    }


    @PostMapping("/promenilozinku")
    public boolean promeniLozinku(@RequestBody Korisnik korisnik){
        return new KorisniciRepo().promeniLozinku(korisnik);
    }

    @PostMapping("/azurirajpodatke")
    public boolean azurirajpodatke(@RequestBody Korisnik korisnik) {
        return new KorisniciRepo().azurirajPodatke(korisnik);
    }

    @PostMapping("/dodajkonobara")
    public boolean dodajkonobara(@RequestBody Korisnik konobar) {
        return new KorisniciRepo().dodajKonobara(konobar);
    }
    
    @GetMapping("/dohvatisvekonobare")
    public List<Korisnik> dohvatiSveKonobare(){
        return new KorisniciRepo().dohvatiSveKonobare();
    }

    @GetMapping("/dohvatikorisnikazazadatoime/{korisnickoime}")
    public Korisnik dohvatikorisnikazazadatoIme(@PathVariable String korisnickoime){
        return new KorisniciRepo().dohvatiKorZaZadatoIme(korisnickoime);
    }
 
    @GetMapping("/dohvbrojgostiju")
    public int dohvatibrojgostiju(){
         return new KorisniciRepo().dohvatibrojgostiju();
    }

}
