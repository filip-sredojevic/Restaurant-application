package com.example.backend.db;

import java.util.List;

import com.example.backend.models.Jelo;

public interface JelovnikInterface {
    
    public List<Jelo> dohvatiSvaJelaRestorana(int idres);
}
