package com.example.backend.models;

public class Korpa {

    private int id;
    private String id_gost;
    private int id_res;
    private String naziv_jela;
    private String sastojci;
    private int cena;
    private String status;
    private int kolicina;
    public Korpa(int id, String id_gost, int id_res, String naziv_jela, String sastojci, int cena, String status, int kol) {
        this.id = id;
        this.id_gost = id_gost;
        this.id_res = id_res;
        this.naziv_jela = naziv_jela;
        this.sastojci = sastojci;
        this.cena = cena;
        this.status = status;
        this.kolicina=kol;
    }
    
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getId_gost() {
        return id_gost;
    }
    public void setId_gost(String id_gost) {
        this.id_gost = id_gost;
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
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public int getKolicina() {
        return kolicina;
    }

    public void setKolicina(int kolocina) {
        this.kolicina = kolocina;
    }
    
}
