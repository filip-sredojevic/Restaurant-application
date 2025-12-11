package com.example.backend.models;

public class Dostava {
    private int id;
    private int id_res;
    private String naziv_restorana;
    private String id_gost;
    private int iznos;
    private String vreme_dostave;
    private String status;
    private String datum_dostave;
    private String obradio;
    private String adresa;
   private String datumdostave;
    
    public String getDatumdostave() {
    return datumdostave;
}
public void setDatumdostave(String datumdostave) {
    this.datumdostave = datumdostave;
}
    public int getId_res() {
        return id_res;
    }
    public void setId_res(int id_res) {
        this.id_res = id_res;
    }
    public String getObradio() {
        return obradio;
    }
    public void setObradio(String obradio) {
        this.obradio = obradio;
    }
    public Dostava(int id,   String id_gost, int ir, String naziv_restorana, int iznos, String vreme_dostave, String status, String datum_dostave, String obr, String adr, String dd) {
        this.id = id;
        this.id_res=ir;
        this.naziv_restorana = naziv_restorana;
        this.id_gost = id_gost;
        this.iznos = iznos;
        this.vreme_dostave = vreme_dostave;
        this.status = status;
        this.datum_dostave = datum_dostave;
        this.obradio=obr;
        this.adresa=adr;
        this.datumdostave=dd;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getNaziv_restorana() {
        return naziv_restorana;
    }
    public void setNaziv_restorana(String naziv_restorana) {
        this.naziv_restorana = naziv_restorana;
    }
    public String getId_gost() {
        return id_gost;
    }
    public void setId_gost(String id_gost) {
        this.id_gost = id_gost;
    }
    public int getIznos() {
        return iznos;
    }
    public void setIznos(int iznos) {
        this.iznos = iznos;
    }
    public String getVreme_dostave() {
        return vreme_dostave;
    }
    public void setVreme_dostave(String vreme_dostave) {
        this.vreme_dostave = vreme_dostave;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getDatum_dostave() {
        return datum_dostave;
    }
    public void setDatum_dostave(String datum_dostave) {
        this.datum_dostave = datum_dostave;
    }
    public String getAdresa() {
        return adresa;
    }
    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }
    

}
