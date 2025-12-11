package com.example.backend.models;

public class Jelo {
    private int id;
    private int id_res;
    private String naziv_jela;
    private String sastojci;
    private int cena;
    public Jelo(int id, int id_res, String naziv_jela, String sastojci, int cena) {
        this.id = id;
        this.id_res = id_res;
        this.naziv_jela = naziv_jela;
        this.sastojci = sastojci;
        this.cena = cena;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getId_res() {
        return id_res;
    }
    public void setId_res(int id_res) {
        this.id_res = id_res;
    }
    public String getNaziv_jela() {
        return naziv_jela;
    }
    public void setNaziv_jela(String naziv_jela) {
        this.naziv_jela = naziv_jela;
    }
    public String getSastojci() {
        return sastojci;
    }
    public void setSastojci(String sastojci) {
        this.sastojci = sastojci;
    }
    public int getCena() {
        return cena;
    }
    public void setCena(int cena) {
        this.cena = cena;
    }
    
}
