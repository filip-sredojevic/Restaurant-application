package com.example.backend.models;

public class Restoran {
    private int id_restorana;
    private String naziv_restorana;
    private String tip_restorana;
    private String adresa_restorana;
    private String opis_restorana;
    private String kontakt_osoba;
    private String brmesta;
    private String xcords;
    private String ycords;
    private String radno_vreme;
    private int json;


    

    public String getXcords() {
        return xcords;
    }
    public void setXcords(String xcords) {
        this.xcords = xcords;
    }
    public String getYcords() {
        return ycords;
    }
    public void setYcords(String ycords) {
        this.ycords = ycords;
    }
    
   
    public Restoran(int _id, String naziv_restorana, String tip_restorana, String adresa_restorana, String opis_restorana,
            String kontakt_osoba,String _brmesta, String xc, String yc, String radnovreme, int js) {
        this.id_restorana=_id;
        this.naziv_restorana = naziv_restorana;
        this.tip_restorana = tip_restorana;
        this.adresa_restorana = adresa_restorana;
        this.opis_restorana = opis_restorana;
        this.kontakt_osoba = kontakt_osoba;
        this.brmesta=_brmesta;
        this.xcords=xc; this.ycords=yc;
         this.radno_vreme=radnovreme;this.json=js;
    }
    public String getNaziv_restorana() {
        return naziv_restorana;
    }
    public void setNaziv_restorana(String naziv_restorana) {
        this.naziv_restorana = naziv_restorana;
    }
    public String getTip_restorana() {
        return tip_restorana;
    }
    public void setTip_restorana(String tip_restorana) {
        this.tip_restorana = tip_restorana;
    }
    public String getAdresa_restorana() {
        return adresa_restorana;
    }
    public void setAdresa_restorana(String adresa_restorana) {
        this.adresa_restorana = adresa_restorana;
    }
    public String getOpis_restorana() {
        return opis_restorana;
    }
    public void setOpis_restorana(String opis_restorana) {
        this.opis_restorana = opis_restorana;
    }
    public String getKontakt_osoba() {
        return kontakt_osoba;
    }
    public void setKontakt_osoba(String kontakt_osoba) {
        this.kontakt_osoba = kontakt_osoba;
    }
    public int getId_restorana() {
        return id_restorana;
    }
    public void setId_restorana(int id_restorana) {
        this.id_restorana = id_restorana;
    }
    public int getJson() {
        return json;
    }
    public void setJson(int json) {
        this.json = json;
    }
    public String getBrmesta() {
        return brmesta;
    }
    public void setBrmesta(String brmesta) {
        this.brmesta = brmesta;
    }
    public String getRadno_vreme() {
        return radno_vreme;
    }
    public void setRadno_vreme(String radno_vreme) {
        this.radno_vreme = radno_vreme;
    }



    
}
