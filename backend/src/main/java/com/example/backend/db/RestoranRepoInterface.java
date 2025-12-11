package com.example.backend.db;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.models.Restoran;

public class RestoranRepoInterface implements RestoranInterface {
  
    int brojRestorana;

    List<Restoran> restorani;
    @Override
    public boolean dodajRestoran(Restoran restoran) {
       

       try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt1 = conn.prepareStatement("insert into restorani (naziv, tip, adresa, opis, kontakt_osoba, brmesta, xcords, ycords, radno_vreme, json) values (?,?,?,?,?,?,?,?,?,?)");) {

           stmt1.setString(1, restoran.getNaziv_restorana());
           stmt1.setString(2, restoran.getTip_restorana());
           stmt1.setString(3, restoran.getAdresa_restorana());
           stmt1.setString(4, restoran.getOpis_restorana());
           stmt1.setString(5, restoran.getKontakt_osoba());
           stmt1.setString(6, restoran.getBrmesta());
           stmt1.setString(7,restoran.getXcords());
           stmt1.setString(8, restoran.getYcords());
           stmt1.setString(9, restoran.getRadno_vreme());
           stmt1.setInt(10,restoran.getJson());

          int rs1=stmt1.executeUpdate(); 
         if(rs1!=0) return true;
         return false;
    

} catch (SQLException e) {
    e.printStackTrace();
}

return false; 




    }

    @Override
    public List<Restoran> dohvatisverestorane() {
          
        restorani=new ArrayList<>();
       try (Connection conn = DB.source().getConnection();
       PreparedStatement stmt1 = conn.prepareStatement("select * from restorani");) {

          ResultSet rs=stmt1.executeQuery();
          while(rs.next()) {
            restorani.add(new Restoran(rs.getInt("id"), rs.getString("naziv"), rs.getString("tip"), rs.getString("adresa"), rs.getString("opis"), rs.getString("kontakt_osoba"), 
            rs.getString("brmesta"), rs.getString("xcords"), rs.getString("ycords"),  rs.getString("radno_vreme"), rs.getInt("json")));
          }
   
          return restorani;

} catch (SQLException e) {
   e.printStackTrace();
}

return null; 



    }

    @Override
    public int dovatiBrojRestorana() {
        brojRestorana=0;
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt1 = conn.prepareStatement("select * from restorani");) {

            ResultSet rs=stmt1.executeQuery();
            while(rs.next()){
                brojRestorana++;
            }
          
       return brojRestorana;
    

} catch (SQLException e) {
    e.printStackTrace();
}

return 0; 

    }

    @Override
    public Restoran dohvatirestoran(int idres) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt1 = conn.prepareStatement("select * from restorani where id= ?");) {

            stmt1.setInt(1,idres);
            ResultSet rs=stmt1.executeQuery();
            if(rs.next()) {
                return new Restoran(rs.getInt("id"), rs.getString("naziv"), rs.getString("tip"), rs.getString("adresa"), rs.getString("opis"), rs.getString("kontakt_osoba"), 
               rs.getString("brmesta"), rs.getString("xcords"), rs.getString("ycords"), rs.getString("radno_vreme"), rs.getInt("json"));
            }
          
      return null;
    

} catch (SQLException e) {
    e.printStackTrace();
}

return null; 



    }
    
}
