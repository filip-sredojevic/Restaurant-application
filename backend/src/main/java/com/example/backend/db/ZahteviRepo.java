package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


import com.example.backend.models.Korisnik;

public class ZahteviRepo implements ZahteviRepoInterface {
    
    List<Korisnik> zahtevi;

    @Override
    public List<Korisnik> dohvatiSveZahteve() {
        
   zahtevi=new ArrayList<>();

        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt1= conn.prepareStatement("select * from zahtevi");){

       ResultSet rs=stmt1.executeQuery();

       while(rs.next()) {
        zahtevi.add(new Korisnik(
            rs.getString("korisnicko_ime"),
            rs.getString("lozinka"),
            rs.getString("bezbedonosno_pitanje"),
            rs.getString("bezbedonosni_odgovor"),
            rs.getString("ime"),
            rs.getString("prezime"),
            rs.getString("pol"),
            rs.getString("adresa"),
            rs.getString("telefon"),
            rs.getString("mejl"),
            rs.getString("broj_kkartice"),
            rs.getInt("profilna_slika"),
            0, //Novo, ova polje ne postoji u tabel zahtevi
            0, //NOVO, ova polje ne postoji u tabel zahtevi       
            rs.getString("tip"),
            rs.getInt("blokiran"))); 
       }

       return zahtevi;


    

} catch (SQLException e) {
    e.printStackTrace();
}
        return null;
    }
    
}
