package com.example.backend.db;

import java.util.List;

import com.example.backend.models.Korisnik;

public interface ZahteviRepoInterface {

  public List<Korisnik> dohvatiSveZahteve();
    
}
