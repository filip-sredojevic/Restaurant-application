import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dostava } from 'src/models/Dostava';
import { Korisnik } from 'src/models/korisnik';
import { Rezervacija } from 'src/models/rezervacija';

@Injectable({
  providedIn: 'root'
})
export class PomocniService {

  constructor(private http: HttpClient) { }


  dohvatiSvaKorisnickaImena(){
    return this.http.get<string[]>('http://localhost:8080/pomocni/dohvatisvezahteve');
  }

  prihvatizahtev(zahtev: Korisnik){
    return this.http.post<boolean>('http://localhost:8080/pomocni/prihvatizahtev',zahtev);
  }

  odbijzahtev(zahtev: Korisnik) {
    return this.http.post<boolean>('http://localhost:8080/pomocni/odbijzahtev',zahtev);
  }
  dohvatisveOdbijeneMejlAdrese(){
    return this.http.get<string[]>('http://localhost:8080/pomocni/dohvatisveodbijenemejladrese');
  }

  dohvatiLokaciju() {
    return this.http.get('https://ipapi.co/json');
  }
  prijaviNeDolazak(rez: Rezervacija){
    return this.http.post<boolean>('http://localhost:8080/pomocni/prijavinedolazak',rez);
  }

  dodajDostavu(dostava: Dostava) {
   
    return this.http.post<boolean>("http://localhost:8080/pomocni/dodajdostavu",dostava);
    
  }
}
