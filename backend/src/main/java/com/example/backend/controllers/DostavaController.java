package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.DostavaRepoInterface;
import com.example.backend.models.Dostava;

@RestController
@RequestMapping("/dostave")
@CrossOrigin(origins = "http://localhost:4200")
public class DostavaController {
    
    @PostMapping("/dohvdostavegosta")
    public List<Dostava> dohvattidostavegosta(@RequestBody String idgost) {
        return new DostavaRepoInterface().dohvatisvedostaveGosta(idgost);
    }
    @GetMapping("/dohvsvedostaverestorana/{idres}")
    public List<Dostava> dohvatisvedostaveres(@PathVariable int idres) {
        return new DostavaRepoInterface().dohvatisvedostaverestorana(idres);
    }

    @PostMapping("/prihvatidostavu")
    public boolean prihvatidostavu(@RequestBody Dostava dostava){
        return new DostavaRepoInterface().privhatidostavu(dostava);
    }
    
}
