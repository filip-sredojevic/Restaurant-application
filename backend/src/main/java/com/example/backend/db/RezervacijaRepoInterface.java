package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


import com.example.backend.models.Rezervacija;

public class RezervacijaRepoInterface implements RezervacijaInterface {

    List<Rezervacija> sverezervacije;
    List<String>komentari;
    List<Rezervacija> sverezervacijerestorana;
    @Override
    public List<Rezervacija> dohatiSveRezervacije() {
        
        sverezervacije=new ArrayList<>();
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from rezervacije ")) {

        
           

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                sverezervacije.add (new Rezervacija(
                        rs.getInt("id_rez"),
                        rs.getInt("id_res"),
                        rs.getString("id_gost"),
                        rs.getInt("broj_stola"),
                        rs.getInt("broj_osoba"),
                        rs.getString("datum"),
                        rs.getString("status"),
                        rs.getString("obradio"),
                        rs.getString("nacin_rezervacije"),
                        rs.getInt("ocena"),
                        rs.getString("komentar"),
                        rs.getString("dodatno"), rs.getInt("prisustvovao"), rs.getInt("produzena")));
                        
            }

            return sverezervacije;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<String> dohvSveKomentareRestorana(int idres) {
        komentari=new ArrayList<>();
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from rezervacije where id_res= ? and komentar != ?")) {

                        
                            stmt.setInt(1,idres);
                            stmt.setString(2,"X");
        

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                komentari.add(new String(rs.getString("komentar")));
                        
            }

            return komentari;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;

    }

    @Override
    public boolean dodajRezervaciju(Rezervacija rez) {
       
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "INSERT INTO REZERVACIJE (id_res, id_gost, broj_stola, broj_osoba, datum,status, obradio, nacin_rezervacije,ocena,komentar,dodatno,prisustvovao,produzena) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)")) {

                stmt.setInt(1, rez.getId_res());
                stmt.setString(2, rez.getId_gost());
                stmt.setInt(3, rez.getBroj_stola());
                stmt.setInt(4, rez.getBroj_osoba());
                stmt.setString(5, rez.getDatum());
                stmt.setString(6, rez.getStatus());
                stmt.setString(7,rez.getObradio());
                stmt.setString(8,rez.getNacin_rezervacije());
                stmt.setInt(9,rez.getOcena());
                stmt.setString(10, rez.getKomentar());
                stmt.setString(11, rez.getDodatno());
                stmt.setInt(12, rez.getPrisustvovao());
                stmt.setInt(13,rez.getProduzena()); //Novo
  
                int rs=stmt.executeUpdate();
                if(rs!=0) return true;
                return false;


}   catch (SQLException e) {
    e.printStackTrace();
}

return false;

    }

    @Override
    public List<Rezervacija> dohatiSveRezervacijeRestorana(int idres) {
        
        sverezervacijerestorana=new ArrayList<>();
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from rezervacije where id_res=?")) {

                            stmt.setInt(1, idres);
           

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                sverezervacijerestorana.add (new Rezervacija(
                        rs.getInt("id_rez"),
                        rs.getInt("id_res"),
                        rs.getString("id_gost"),
                        rs.getInt("broj_stola"),
                        rs.getInt("broj_osoba"),
                        rs.getString("datum"),
                        rs.getString("status"),
                        rs.getString("obradio"),
                        rs.getString("nacin_rezervacije"),
                        rs.getInt("ocena"),
                        rs.getString("komentar"),
                        rs.getString("dodatno"), rs.getInt("prisustvovao"), rs.getInt("produzena")));
                        
            }

            return sverezervacijerestorana;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
        
    }

    @Override
    public boolean prihvatiRezervaciju(Rezervacija rez) {
     
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "update  rezervacije set status= ?, obradio = ? where id_rez= ?")) {

                    stmt.setString(1,"rezervisan");
                    stmt.setString(2,rez.getObradio());
                    stmt.setInt(3, rez.getId_rez());

        int rs=stmt.executeUpdate();
        if(rs!=0) return true;
       return false;
    }

  

 catch (SQLException e) {
    e.printStackTrace();
}

return false;


}

    @Override
    public boolean prihvatiRezervacijuSaStolom(Rezervacija rez) {
    //if(1==1) return true;
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "update rezervacije set status= ?, broj_stola= ?, obradio= ? where id_rez= ?")) {

                    stmt.setString(1,"rezervisan");
                    stmt.setInt(2, rez.getBroj_stola());
                    stmt.setString(3,rez.getObradio());
                    stmt.setInt(4, rez.getId_rez());

        int rs=stmt.executeUpdate();
        if(rs!=0) return true;
       return false;
    }

  

 catch (SQLException e) {
    e.printStackTrace();
}

return false;
    }

    @Override
    public boolean odbijRezervaciju(Rezervacija rez) {
       
   
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "update  rezervacije set status= ?, obradio = ? where id_rez= ?")) {

                    stmt.setString(1,"odbijen");
                    stmt.setString(2,rez.getObradio());
                    stmt.setInt(3, rez.getId_rez());

        int rs=stmt.executeUpdate();
        if(rs!=0) return true;
       return false;
    }

  

 catch (SQLException e) {
    e.printStackTrace();
}

return false;


    }

    @Override
    public boolean oceniRezervaciju(Rezervacija rez) {
        
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "update  rezervacije set ocena= ?, komentar= ? where id_rez= ?")) {

                    stmt.setInt(1,rez.getOcena());
                    stmt.setString(2,rez.getKomentar());
                    stmt.setInt(3, rez.getId_rez());

        int rs=stmt.executeUpdate();
        if(rs!=0) return true;
       return false;
    }

  

 catch (SQLException e) {
    e.printStackTrace();
}

return false;


    }

    @Override
    public boolean otkaziRezervaciju(int idrez) {
     

        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "update rezervacije set status= ? where id_rez= ?")) {

                    stmt.setString(1,"otkazana");
                    stmt.setInt(2, idrez);

        int rs=stmt.executeUpdate();
        if(rs!=0) return true;
       return false;
    }

  

 catch (SQLException e) {
    e.printStackTrace();
}

return false;
    }

    @Override
    public boolean prijaviDolazak(int idrez) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "update rezervacije set prisustvovao= ? where id_rez= ?")) {

                    stmt.setInt(1,1);
                    stmt.setInt(2, idrez);

        int rs=stmt.executeUpdate();
        if(rs!=0) return true;
       return false;
    }

  

 catch (SQLException e) {
    e.printStackTrace();
}

return false;

    }

    @Override
    public boolean produziRezervaciju(int idrez) {
      
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "update rezervacije set produzena=1 where id_rez=?")) {

                   stmt.setInt(1,idrez);

        int rs=stmt.executeUpdate();
        if(rs!=0) return true;
       return false;
    }

  

 catch (SQLException e) {
    e.printStackTrace();
}

return false;
    }
    }
    

