package com.example.backend.db;

import java.util.List;

import com.example.backend.models.Rezervacija;

public interface RezervacijaInterface  {

    public List<Rezervacija> dohatiSveRezervacije();
    public List<String> dohvSveKomentareRestorana(int idres);
    public boolean dodajRezervaciju(Rezervacija rezerevacija);
    public List<Rezervacija> dohatiSveRezervacijeRestorana(int idres);
    public boolean prihvatiRezervaciju(Rezervacija rez);
    public boolean prihvatiRezervacijuSaStolom(Rezervacija rez);
    public boolean odbijRezervaciju(Rezervacija rez);
    public boolean oceniRezervaciju(Rezervacija rez);
    public boolean otkaziRezervaciju(int idrez);
    public boolean prijaviDolazak(int idrez);
    public boolean produziRezervaciju(int idrez);
    
}
