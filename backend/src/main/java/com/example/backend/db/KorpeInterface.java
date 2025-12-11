package com.example.backend.db;

import java.util.List;

import com.example.backend.models.Korpa;

public interface KorpeInterface {
    
    public boolean dodajKorpu(Korpa korpa);
    public List<Korpa> dohvatikorpuGosta( String idgost,int idres);
    public List<Korpa> uklonikorpu(Korpa korpa);
}
