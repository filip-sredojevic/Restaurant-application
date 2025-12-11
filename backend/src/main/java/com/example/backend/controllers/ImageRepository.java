package com.example.backend.controllers;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.models.Image;

import java.util.Optional;
@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
   Optional<Image> findBykljuc(String kljuc);
}