package com.example.backend.db;



import java.util.List;

import com.example.backend.models.Korisnik;

public interface KorisniciRepoInterface {

    public String dohvatitelefon(String korime);
    public Korisnik prijava(Korisnik korisnik);
    public boolean dodavanjeZahteva(Korisnik korisnik);
    public List<Korisnik> dohvatiSveGoste();
    public boolean blokirajGosta(Korisnik gost);
    public boolean odblokirajGosta(Korisnik gost);
    public boolean promeniLozinku(Korisnik korisnik);
    public boolean azurirajPodatke(Korisnik korisnik);
    public boolean dodajKonobara(Korisnik konobar);
    public List<Korisnik> dohvatiSveKonobare();

    public Korisnik dohvatiKorZaZadatoIme(String korisnickoIme);
    public int dohvatibrojgostiju();
    

    public List<Korisnik> dohvKonovareRestorana(int idres);
    
}