package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.models.Dostava;
import com.example.backend.models.Korisnik;
import com.example.backend.models.Rezervacija;

public class PomocniRepoInterface implements PomocniInterface{

    List<String> korisnicka_imena;
    List<String> odbijeneMejlAdrese;


    @Override
    public List<String> dohvatiSvaKorImena() {
       


        korisnicka_imena=new ArrayList<>();

        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt1= conn.prepareStatement("select * from korisnici");
        PreparedStatement stmt2=conn.prepareStatement("select * from zahtevi");) {


      ResultSet rs1=stmt1.executeQuery();
      while(rs1.next()) {
        korisnicka_imena.add(new String(rs1.getString("korisnicko_ime")));
      }
      ResultSet rs2=stmt2.executeQuery();
      while(rs2.next()) {
        korisnicka_imena.add(new String(rs2.getString("korisnicko_ime")));
      }

      return korisnicka_imena;
    

} catch (SQLException e) {
    e.printStackTrace();
}
        return null;

    }

    @Override
    public boolean prihvatiZahtev(Korisnik zahtev) {
       
     
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt1 = conn.prepareStatement("insert into korisnici values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        PreparedStatement stmt2=conn.prepareStatement("delete from zahtevi where korisnicko_ime= ?");) {

    stmt1.setString(1, zahtev.getKorisnicko_ime());
    stmt1.setString(2, zahtev.getLozinka());
    stmt1.setString(3, zahtev.getBezbedonosno_pitanje());
    stmt1.setString(4, zahtev.getBezbedonosni_odgovor());
    stmt1.setString(5 ,zahtev.getIme());
    stmt1.setString(6, zahtev.getPrezime());
    stmt1.setString(7, zahtev.getPol());
    stmt1.setString(8, zahtev.getAdresa());
    stmt1.setString(9, zahtev.getTelefon());
    stmt1.setString(10, zahtev.getMejl());
    stmt1.setString(11, zahtev.getBroj_kkartice());
    stmt1.setInt(12, zahtev.getProfilna_slika());
    stmt1.setInt(13, zahtev.getId_restorana()); //NOVO
    stmt1.setInt(14,zahtev.getBrojnepojavljivanja());
    stmt1.setString(15, zahtev.getTip());
    stmt1.setInt(16, 0); //Inicijalno je gost odblokiran

    int rs1=stmt1.executeUpdate();
    
    stmt2.setString(1, zahtev.getKorisnicko_ime());
    int rs2=stmt2.executeUpdate();
    if(rs1!=0 && rs2!=0) {return true;}
    return false;
    

} catch (SQLException e) {
    e.printStackTrace();
}

return false;  }

    @Override
    public boolean odbijZahtev(Korisnik zahtev) {
        

        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt1 = conn.prepareStatement("insert into odbijenizahtevi values (?,?,?,?,?,?,?,?,?,?,?,?,?)");
        PreparedStatement stmt2=conn.prepareStatement("delete from zahtevi where korisnicko_ime= ?");) {

    stmt1.setString(1, zahtev.getKorisnicko_ime());
    stmt1.setString(2, zahtev.getLozinka());
    stmt1.setString(3, zahtev.getBezbedonosno_pitanje());
    stmt1.setString(4, zahtev.getBezbedonosni_odgovor());
    stmt1.setString(5 ,zahtev.getIme());
    stmt1.setString(6, zahtev.getPrezime());
    stmt1.setString(7, zahtev.getPol());
    stmt1.setString(8, zahtev.getAdresa());
    stmt1.setString(9, zahtev.getTelefon());
    stmt1.setString(10, zahtev.getMejl());
    stmt1.setString(11, zahtev.getBroj_kkartice());
    stmt1.setInt(12, zahtev.getProfilna_slika());
    stmt1.setString(13, zahtev.getTip());

    int rs1=stmt1.executeUpdate();
    
    stmt2.setString(1, zahtev.getKorisnicko_ime());
    int rs2=stmt2.executeUpdate();
    if(rs1!=0 && rs2!=0) {return true;}
    return false;
    

} catch (SQLException e) {
    e.printStackTrace();
}

return false; 


    }

    @Override
    public List<String> dohvatiSveOdbijeneMejlAdrese() {
        odbijeneMejlAdrese=new ArrayList<>();


        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt= conn.prepareStatement("select * from odbijenizahtevi");){


        ResultSet rs=stmt.executeQuery();
        while(rs.next()){
            odbijeneMejlAdrese.add(new String(rs.getString("mejl")));
        }
         
        return odbijeneMejlAdrese;

} catch (SQLException e) {
    e.printStackTrace();
}
        return null;



    }

    @Override
    public boolean prijaviNeDolazak(Rezervacija rez) {
        


        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt1 = conn.prepareStatement("update rezervacije set prisustvovao= ? where id_rez= ?");
        PreparedStatement stmt2=conn.prepareStatement("update korisnici set brojnepojavljivanja=brojnepojavljivanja+1 where korisnicko_ime=?");
        PreparedStatement stmt3=conn.prepareStatement("select * from korisnici where korisnicko_ime=?");
        PreparedStatement stm4=conn.prepareStatement("update korisnici set blokiran=1 where korisnicko_ime=?");) {

                    stmt1.setInt(1,-1);
                    stmt1.setInt(2, rez.getId_rez());
          int brnepoj=0;  
        int rs1=stmt1.executeUpdate();
        if(rs1==0) return false;
        stmt2.setString(1, rez.getId_gost());
        int rs2=stmt2.executeUpdate();
        if(rs2==0) return false;
        stmt3.setString(1, rez.getId_gost());
         ResultSet rs3=stmt3.executeQuery();
         if(rs3.next()) {
                brnepoj=rs3.getInt("brojnepojavljivanja");
         }
         if(brnepoj==3) {
            stm4.setString(1, rez.getId_gost());
            int rs4=stm4.executeUpdate();
            if(rs4!=0) return true;
            return false;
         }
         return true;
        
    }

  

 catch (SQLException e) {
    e.printStackTrace();
}

return false;

    }

    @Override
    public boolean dodajDostavu(Dostava dostava) {
        
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt1= conn.prepareStatement("INSERT INTO DOSTAVE(id_gost, id_res,naziv_restorana,iznos,vreme_dostave,status,datum_dostave,obradio,adresa, datumdostave) values (?,?,?,?,?,?,?,?,?,?)");
        PreparedStatement stmt2= conn.prepareStatement("update korpe set status= ? where id_gost=? and id_res=?");){


        stmt1.setString(1,dostava.getId_gost());
        stmt1.setInt(2, dostava.getId_res());
        stmt1.setString(3,dostava.getNaziv_restorana());
        stmt1.setInt(4,dostava.getIznos());
        stmt1.setString(5, dostava.getVreme_dostave());
        stmt1.setString(6, dostava.getStatus());
        stmt1.setString(7, dostava.getDatum_dostave());
        stmt1.setString(8, dostava.getObradio());
        stmt1.setString(9, dostava.getAdresa());
        stmt1.setString(10, dostava.getDatumdostave());

        int rs1=stmt1.executeUpdate();
        if(rs1!=0) {
            stmt2.setString(1, "naruceno");
            stmt2.setString(2, dostava.getId_gost());
            stmt2.setInt(3, dostava.getId_res());
            int rs2=stmt2.executeUpdate();
            if(rs2!=0) return true;
        }
        return false;
} catch (SQLException e) {
    e.printStackTrace();
}
        return false;


    }


}
    
