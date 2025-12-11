package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.models.Korpa;

public class KorpeRepoInterface implements KorpeInterface {

    List<Korpa> korpagosta;
    @Override
    public boolean dodajKorpu(Korpa korpa) {
      
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "insert into korpe (id_gost,id_res,naziv_jela,sastojci,cena,status, kolicina) VALUES (?,?,?,?,?,?,?)")) {

                  stmt.setString(1,korpa.getId_gost());
                  stmt.setInt(2, korpa.getId_res());
                  stmt.setString(3, korpa.getNaziv_jela());
                  stmt.setString(4, korpa.getSastojci());
                  stmt.setInt(5, korpa.getCena());
                  stmt.setString(6, "u toku");
                  stmt.setInt(7,korpa.getKolicina());
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
    public List<Korpa> dohvatikorpuGosta(String idgost, int idres) {
       korpagosta=new ArrayList<>();
       try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "select * from korpe where id_gost= ? and id_res= ? and  status=?")) {

                    stmt.setString(1, idgost);
                    stmt.setInt(2, idres);
                stmt.setString(3, "u toku");
                ResultSet rs=stmt.executeQuery();
                while(rs.next()) {
                    korpagosta.add(new Korpa(rs.getInt("id"), rs.getString("id_gost"), rs.getInt("id_res"), rs.getString("naziv_jela"), rs.getString("sastojci"), rs.getInt("cena"),rs.getString("status"), rs.getInt("kolicina")));
                }
                return korpagosta;
       }
       
    
  

    catch (SQLException e) {
           e.printStackTrace();
      } 

return null;

    }

    @Override
    public List<Korpa> uklonikorpu(Korpa korpa) {


        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "delete from korpe where id=?")) {

                    stmt.setInt(1, korpa.getId());
               
               int rs=stmt.executeUpdate();
               if(rs!=0) {return this.dohvatikorpuGosta(korpa.getId_gost(), korpa.getId_res());}
       }
        

    catch (SQLException e) {
           e.printStackTrace();
      } 

return null;
        

    }
    
    }

   
    

