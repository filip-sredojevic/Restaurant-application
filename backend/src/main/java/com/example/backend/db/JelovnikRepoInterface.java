package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.models.Jelo;

public class JelovnikRepoInterface implements JelovnikInterface {

    List<Jelo> jelarestorana;
    @Override
    public List<Jelo> dohvatiSvaJelaRestorana(int idres) {
        jelarestorana=new ArrayList<>();
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "select * from jelovnik where id_res=?");) {

                   stmt.setInt(1,idres);
                  ResultSet rs=stmt.executeQuery();
                  while(rs.next()) {
                    jelarestorana.add(new Jelo(rs.getInt("id"), rs.getInt("id_res"), rs.getString("naziv_jela"), rs.getString("sastojci"), rs.getInt("cena")));
                  }
                  return jelarestorana;
                 
    }

  

 catch (SQLException e) {
    e.printStackTrace();
}

return null;
    }
    
}
