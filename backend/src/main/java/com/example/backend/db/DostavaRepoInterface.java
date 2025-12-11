package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.models.Dostava;

public class DostavaRepoInterface implements DostavaInterface {

    List<Dostava> dostavegosta;
    List<Dostava> dostaverestorana;
    @Override
    public List<Dostava> dohvatisvedostaveGosta(String idgost) {
        
        dostavegosta=new ArrayList<>();
           try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "select * from dostave where  id_gost=?")) {

                   stmt.setString(1,idgost);

                ResultSet rs=stmt.executeQuery();
                while(rs.next()) {
                    dostavegosta.add(new Dostava(rs.getInt("id"), rs.getString("id_gost"), rs.getInt("id_res"), rs.getString("naziv_restorana"),
                    rs.getInt("iznos"), rs.getString("vreme_dostave"), rs.getString("status"), rs.getString("datum_dostave"), rs.getString("obradio"), rs.getString("adresa"), rs.getString("datumdostave")));
                }

                return dostavegosta;
    }

  

 catch (SQLException e) {
    e.printStackTrace();
}

return null;

    }
    @Override
    public List<Dostava> dohvatisvedostaverestorana(int idres) {
        dostaverestorana=new ArrayList<>();
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "select * from dostave where  id_res=?")) {

                   stmt.setInt(1,idres);

                ResultSet rs=stmt.executeQuery();
                while(rs.next()) {
                    dostaverestorana.add(new Dostava(rs.getInt("id"), rs.getString("id_gost"), rs.getInt("id_res"), rs.getString("naziv_restorana"),
                    rs.getInt("iznos"), rs.getString("vreme_dostave"), rs.getString("status"), rs.getString("datum_dostave"), rs.getString("obradio"), rs.getString("adresa"), rs.getString("datumdostave")));
                }

                return dostaverestorana;
    }

  

 catch (SQLException e) {
    e.printStackTrace();
}

return null;

    
}
    
    @Override
    public boolean privhatidostavu(Dostava dostava) {
        
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "update  dostave set status=?, vreme_dostave=?, datum_dostave=?, obradio=?, datumdostave= ? where  id=?")) {

                   stmt.setString(1, "prihvacena");
                   stmt.setString(2, dostava.getVreme_dostave());
                   stmt.setString(3,dostava.getDatum_dostave());
                   stmt.setString(4, dostava.getObradio());
                   stmt.setString(5,dostava.getDatumdostave());
                   stmt.setInt(6,dostava.getId());
                   int  rs=stmt.executeUpdate();
                  if(rs!=0) return true;
    }

  

 catch (SQLException e) {
    e.printStackTrace();
}

return  false;

    }

}