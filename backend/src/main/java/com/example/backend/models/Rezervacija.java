package com.example.backend.models;

public class Rezervacija {
 
    private int id_rez;
    private int id_res;
    private String id_gost;
    private int broj_stola;
    private int broj_osoba;
    private String datum;
    private String status;
    private String obradio;
    private String nacin_rezervacije;
    private int ocena;
    private String komentar;
    private String dodatno;
    private int prisustvovao;
    private int produzena;

    
    public int getPrisustvovao() {
        return prisustvovao;
    }
    public void setPrisustvovao(int prisustvovao) {
        this.prisustvovao = prisustvovao;
    }
    public Rezervacija(int id_rez, int id_res, String id_gost, int broj_stola, int broj_osoba, String datum, String status,
            String obradio, String nacin_rezervacije, int ocena, String komentar, String dodatno, int pris, int prod) {
        this.id_rez = id_rez;
        this.id_res = id_res;
        this.id_gost = id_gost;
        this.broj_stola = broj_stola;
        this.broj_osoba = broj_osoba;
        this.datum = datum;
        this.status = status;
        this.obradio = obradio;
        this.nacin_rezervacije = nacin_rezervacije;
        this.ocena = ocena;
        this.komentar = komentar;
        this.dodatno = dodatno;
        this.prisustvovao=pris;
        this.produzena=prod;
    }
    public int getId_rez() {
        return id_rez;
    }
    public void setId_rez(int id_rez) {
        this.id_rez = id_rez;
    }
    public int getId_res() {
        return id_res;
    }
    public void setId_res(int id_res) {
        this.id_res = id_res;
    }
    public String getId_gost() {
        return id_gost;
    }
    public void setId_gost(String id_gost) {
        this.id_gost = id_gost;
    }
    public int getBroj_stola() {
        return broj_stola;
    }
    public void setBroj_stola(int broj_stola) {
        this.broj_stola = broj_stola;
    }
    public int getBroj_osoba() {
        return broj_osoba;
    }
    public void setBroj_osoba(int broj_osoba) {
        this.broj_osoba = broj_osoba;
    }
    public String getDatum() {
        return datum;
    }
    public void setDatum(String datum) {
        this.datum = datum;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getObradio() {
        return obradio;
    }
    public void setObradio(String obradio) {
        this.obradio = obradio;
    }
    public String getNacin_rezervacije() {
        return nacin_rezervacije;
    }
    public void setNacin_rezervacije(String nacin_rezervacije) {
        this.nacin_rezervacije = nacin_rezervacije;
    }
    public int getOcena() {
        return ocena;
    }
    public void setOcena(int ocena) {
        this.ocena = ocena;
    }
    public String getKomentar() {
        return komentar;
    }
    public void setKomentar(String komentar) {
        this.komentar = komentar;
    }
    public String getDodatno() {
        return dodatno;
    }
    public void setDodatno(String dodatno) {
        this.dodatno = dodatno;
    }
    public int getProduzena() {
        return produzena;
    }
    public void setProduzena(int produzena) {
        this.produzena = produzena;
    }

    
}
