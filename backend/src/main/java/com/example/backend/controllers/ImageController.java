package com.example.backend.controllers;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.models.Image;

import org.springframework.http.MediaType;

@RestController
@RequestMapping("/slike")
@CrossOrigin(origins = "http://localhost:4200")

public class ImageController {
 
    Image image;
    @Autowired
    private ImageRepository imageRepository;

    @PostMapping("/stavisliku")
    public boolean uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("kljuc") String slikakljuc) {
            
        try {
            Optional<Image> existingImageOptional = imageRepository.findBykljuc(slikakljuc);
            if (existingImageOptional.isPresent()) {
                // Ako postoji slika sa datim ključem, ažuriraj je
                Image existingImage = existingImageOptional.get();
                existingImage.setData(file.getBytes());
                imageRepository.save(existingImage);
            } else {
                // Ako ne postoji slika sa datim ključem, dodaj novu sliku
                Image newImage = new Image();
                newImage.setkljuc(slikakljuc);
                newImage.setData(file.getBytes());
                imageRepository.save(newImage);
            }
            return true;
        } catch (IOException e) {
            return false;
        }


    }


    @GetMapping("/dohvatisliku/{kljuc}")
public ResponseEntity<byte[]> getImageByKey(@PathVariable String kljuc) {
    Optional<Image> imageOptional = imageRepository.findBykljuc(kljuc);
    if (imageOptional.isPresent()) {
        Image image = imageOptional.get();
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image.getData());
    } else {
       // return ResponseEntity.notFound().build();
       return null;
    }
}
    // Dodaj ostale metode ako je potrebno
}
