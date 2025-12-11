package com.example.backend.db;

import java.util.List;

import com.example.backend.models.Restoran;

public interface RestoranInterface {
    
    public boolean dodajRestoran(Restoran restoran);
    public List<Restoran> dohvatisverestorane();
    public int dovatiBrojRestorana();
    public Restoran dohvatirestoran(int idres);
}
