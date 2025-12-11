package com.example.backend.db;

import java.util.List;

import com.example.backend.models.Dostava;

public interface DostavaInterface {
    
    public List<Dostava> dohvatisvedostaveGosta(String idgost);
    public List<Dostava> dohvatisvedostaverestorana(int idres);
    public boolean privhatidostavu(Dostava  dostava);
}
