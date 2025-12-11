package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.models.Korisnik;

public class KorisniciRepo implements KorisniciRepoInterface {

    List<String> korisnicka_imena;
    List<Korisnik> gosti;
    List<Korisnik> konobari;
    List<Korisnik> konobariresotrana;
    int brojGostiju;

    @Override
    public String dohvatitelefon(String korime) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "select * from korisnici where korisnicko_ime=?")) {

     stmt.setString(1,korime);
    ResultSet rs = stmt.executeQuery();
    if(rs.next()) return rs.getString("telefon");

} catch (SQLException e) {
    e.printStackTrace();
}

return null;
    }

    @Override 
    public List<Korisnik> dohvKonovareRestorana(int idres){
        konobariresotrana=new ArrayList<>();

        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from korisnici where id_restorana=?")) {

             stmt.setInt(1,idres);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
              konobariresotrana.add(new Korisnik(
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
                        rs.getInt("id_restorana"),//NOVO
                        rs.getInt("brojnepojavljivanja"), //NOVO
                        rs.getString("tip"),0));
                        
            }
            return konobariresotrana;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;

    }
    @Override
    public int dohvatibrojgostiju(){
        brojGostiju=0;
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from korisnici where tip = ?")) {

                            stmt.setString(1, "gost");
        
            ResultSet rs=stmt.executeQuery();
            while (rs.next()) {
                brojGostiju++;
                
            }
            return brojGostiju;
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
 
    }
    @Override
    public Korisnik prijava(Korisnik korisnik) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from korisnici where korisnicko_ime = ? and lozinka = ? and tip = ? and blokiran= ?")) {

            stmt.setString(1, korisnik.getKorisnicko_ime());
            stmt.setString(2, korisnik.getLozinka());
            stmt.setString(3, korisnik.getTip());
            stmt.setInt(4,0);

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Korisnik(
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
                        rs.getInt("id_restorana"),//NOVO
                        rs.getInt("brojnepojavljivanja"), //NOVO
                        rs.getString("tip"),0);
                        
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public boolean dodavanjeZahteva(Korisnik korisnik) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "insert into zahtevi values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)")) {

    stmt.setString(1, korisnik.getKorisnicko_ime());
    stmt.setString(2, korisnik.getLozinka());
    stmt.setString(3, korisnik.getBezbedonosno_pitanje());
    stmt.setString(4, korisnik.getBezbedonosni_odgovor());
    stmt.setString(5,korisnik.getIme());
    stmt.setString(6,korisnik.getPrezime());
    stmt.setString(7,korisnik.getPol());
    stmt.setString(8,korisnik.getAdresa());
    stmt.setString(9,korisnik.getTelefon());
    stmt.setString(10,korisnik.getMejl());
    stmt.setString(11,korisnik.getBroj_kkartice());
    stmt.setInt(12,korisnik.getProfilna_slika());
    stmt.setString(13, korisnik.getTip());
    stmt.setInt(14,0);//Novo

    int rs=stmt.executeUpdate();
    if(rs!=0)  {return true; }
    else  { return false; }

    

} catch (SQLException e) {
    e.printStackTrace();
}

return false;


    }

    @Override
    public List<Korisnik> dohvatiSveGoste() {
        gosti=new ArrayList<>();
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from korisnici where  tip = ?")) {

            stmt.setString(1, "gost");
           

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                gosti.add (new Korisnik(
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
                        rs.getInt("id_restorana"),//NOVO
                        rs.getInt("brojnepojavljivanja"), //NOVO
                        rs.getString("tip"),
                        rs.getInt("blokiran")));
                        
            }

            return gosti;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;




    }

    @Override
    public boolean blokirajGosta(Korisnik gost) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "update korisnici  set blokiran=1 where korisnicko_ime = ?")) {

            stmt.setString(1, gost.getKorisnicko_ime());
             int rs=stmt.executeUpdate();
             if(rs!=0) return true;
           

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;

       
    }

    @Override
    public boolean promeniLozinku(Korisnik korisnik) {
    
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "update korisnici set lozinka=? where korisnicko_ime= ?")) {

                    stmt.setString(1, korisnik.getLozinka());
    
    stmt.setString(2, korisnik.getKorisnicko_ime());
    int rs=stmt.executeUpdate();
    if(rs!=0)  {return true; }
    else  { return false; }

    

} catch (SQLException e) {
    e.printStackTrace();
}

return false;



    }

    @Override
    public boolean odblokirajGosta(Korisnik gost) {
        
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "update korisnici  set blokiran=0 where korisnicko_ime = ?")) {

        stmt.setString(1, gost.getKorisnicko_ime());
        int rs=stmt.executeUpdate();
        if(rs!=0) return true;
   

    } catch (SQLException e) {
            e.printStackTrace();
    }

     return false;


    }

    @Override
    public boolean azurirajPodatke(Korisnik korisnik) {
        
     // if(this.prijava(korisnik)==null) return false; //Paznja
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "update korisnici set ime = ?, prezime = ?, adresa= ?, mejl = ?, telefon = ?, broj_kkartice = ?, profilna_slika= ? where korisnicko_ime = ?");) {

    stmt.setString(1,korisnik.getIme());
    stmt.setString(2, korisnik.getPrezime());
    stmt.setString(3,korisnik.getAdresa());
    stmt.setString(4,korisnik.getMejl());
    stmt.setString(5,korisnik.getTelefon());
    stmt.setString(6,korisnik.getBroj_kkartice());
    stmt.setInt(7, korisnik.getProfilna_slika());
    stmt.setString(8, korisnik.getKorisnicko_ime());

    int rs=stmt.executeUpdate();
    if(rs!=0)  {return true; }
    else  { return false; }

    

} catch (SQLException e) {
    e.printStackTrace();
}

return false;
         

    }

    @Override
    public boolean dodajKonobara(Korisnik konobar) {
        
  
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt1 = conn.prepareStatement("insert into korisnici values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");) {

    stmt1.setString(1, konobar.getKorisnicko_ime());
    stmt1.setString(2, konobar.getLozinka());
    stmt1.setString(3, konobar.getBezbedonosno_pitanje());
    stmt1.setString(4, konobar.getBezbedonosni_odgovor());
    stmt1.setString(5 ,konobar.getIme());
    stmt1.setString(6, konobar.getPrezime());
    stmt1.setString(7, konobar.getPol());
    stmt1.setString(8, konobar.getAdresa());
    stmt1.setString(9, konobar.getTelefon());
    stmt1.setString(10, konobar.getMejl());
    stmt1.setString(11, konobar.getBroj_kkartice());
    stmt1.setInt(12, konobar.getProfilna_slika());
    stmt1.setInt(13, konobar.getId_restorana());
    stmt1.setInt(14, konobar.getBrojnepojavljivanja());
    stmt1.setString(15,"konobar");
    stmt1.setInt(16,0);

    int rs1=stmt1.executeUpdate();
    
    if(rs1!=0) return true;
    return false;
    

} catch (SQLException e) {
    e.printStackTrace();
}

return false; 

 
        
    }

    @Override
    public List<Korisnik> dohvatiSveKonobare() {
      

        konobari=new ArrayList<>();
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from korisnici where  tip = ?")) {

            stmt.setString(1, "konobar");
           

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                konobari.add (new Korisnik(
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
                        rs.getInt("id_restorana"),//NOVO
                        rs.getInt("brojnepojavljivanja"), //NOVO
                        rs.getString("tip"),
                        rs.getInt("blokiran")));
                        
            }

            return konobari;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public Korisnik dohvatiKorZaZadatoIme(String korisnickoIme) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "select * from korisnici where korisnicko_ime = ?")) {

    stmt.setString(1, korisnickoIme);
    

    ResultSet rs = stmt.executeQuery();
    if (rs.next()) {
        return new Korisnik(
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
                rs.getInt("id_restorana"),//NOVO
                rs.getInt("brojnepojavljivanja"), //NOVO
                rs.getString("tip"),0);
                
    }

} catch (SQLException e) {
    e.printStackTrace();
}

return null;
    }

    
   

    
}
