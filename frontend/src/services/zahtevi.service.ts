import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from 'src/models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class ZahteviService {

  constructor(private http: HttpClient) { }


  dohvatiSveZahteve(){
    return this.http.get<Korisnik[]>("http://localhost:8080/zahtevi/dohvsvezahteve");
  }

  
}
