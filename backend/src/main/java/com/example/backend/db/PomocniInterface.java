package com.example.backend.db;

import java.util.List;

import com.example.backend.models.Dostava;
import com.example.backend.models.Korisnik;
import com.example.backend.models.Rezervacija;

public interface PomocniInterface {

    public List<String> dohvatiSvaKorImena();
    public boolean prihvatiZahtev(Korisnik zahtev);
    public boolean odbijZahtev(Korisnik zahtev);
    public List<String> dohvatiSveOdbijeneMejlAdrese();
    public boolean prijaviNeDolazak(Rezervacija rez);
    public boolean dodajDostavu(Dostava dostava);
    
}
