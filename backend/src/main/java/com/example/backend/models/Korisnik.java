package com.example.backend.models;

public class Korisnik {

   private String  korisnicko_ime;
   private String lozinka;
   private String bezbedonosno_pitanje;
   private String bezbedonosni_odgovor;
   private String ime;
   private String prezime;
   private String pol;
   private String adresa;
   private String telefon;
   private String mejl;
   private String broj_kkartice;
   private int profilna_slika;
   private int id_restorana;
   private int brojnepojavljivanja;
   public int getId_restorana() {
    return id_restorana;
}
public void setId_restorana(int id_restorana) {
    this.id_restorana = id_restorana;
}
public int getBrojnepojavljivanja() {
    return brojnepojavljivanja;
}
public void setBrojnepojavljivanja(int brojnepojavljivanja) {
    this.brojnepojavljivanja = brojnepojavljivanja;
}
private String tip;
   private int blokiran;

public int getBlokiran() {
    return blokiran;
}
public void setBlokiran(int blokiran) {
    this.blokiran = blokiran;
}
public Korisnik(String korisnicko_ime, String lozinka, String bezbedonosno_pitanje, String bezbedonosni_odgovor,
        String ime, String prezime, String pol, String adresa, String telefon, String mejl, String broj_kkartice,
        int profilna_slika, int idres, int bnp, String _tip, int blok) {
    this.korisnicko_ime = korisnicko_ime;
    this.lozinka = lozinka;
    this.bezbedonosno_pitanje = bezbedonosno_pitanje;
    this.bezbedonosni_odgovor = bezbedonosni_odgovor;
    this.ime = ime;
    this.prezime = prezime;
    this.pol = pol;
    this.adresa = adresa;
    this.telefon = telefon;
    this.mejl = mejl;
    this.broj_kkartice = broj_kkartice;
    this.profilna_slika = profilna_slika;
    this.tip = _tip;
    this.blokiran=blok;
    this.id_restorana=idres; this.brojnepojavljivanja=bnp;
}
public String getKorisnicko_ime() {
    return korisnicko_ime;
}
public void setKorisnicko_ime(String korisnicko_ime) {
    this.korisnicko_ime = korisnicko_ime;
}
public String getLozinka() {
    return lozinka;
}
public void setLozinka(String lozinka) {
    this.lozinka = lozinka;
}
public String getBezbedonosno_pitanje() {
    return bezbedonosno_pitanje;
}
public void setBezbedonosno_pitanje(String bezbedonosno_pitanje) {
    this.bezbedonosno_pitanje = bezbedonosno_pitanje;
}
public String getBezbedonosni_odgovor() {
    return bezbedonosni_odgovor;
}
public void setBezbedonosni_odgovor(String bezbedonosni_odgovor) {
    this.bezbedonosni_odgovor = bezbedonosni_odgovor;
}
public String getIme() {
    return ime;
}
public void setIme(String ime) {
    this.ime = ime;
}
public String getPrezime() {
    return prezime;
}
public void setPrezime(String prezime) {
    this.prezime = prezime;
}
public String getPol() {
    return pol;
}
public void setPol(String pol) {
    this.pol = pol;
}
public String getAdresa() {
    return adresa;
}
public void setAdresa(String adresa) {
    this.adresa = adresa;
}
public String getTelefon() {
    return telefon;
}
public void setTelefon(String telefon) {
    this.telefon = telefon;
}
public String getMejl() {
    return mejl;
}
public void setMejl(String mejl) {
    this.mejl = mejl;
}
public String getBroj_kkartice() {
    return broj_kkartice;
}
public void setBroj_kkartice(String broj_kkartice) {
    this.broj_kkartice = broj_kkartice;
}
public int getProfilna_slika() {
    return profilna_slika;
}
public void setProfilna_slika(int profilna_slika) {
    this.profilna_slika = profilna_slika;
}
public String getTip() {
    return tip;
}
public void setTip(String tip) {
    this.tip = tip;
}





    
    
    }
    
    
    

