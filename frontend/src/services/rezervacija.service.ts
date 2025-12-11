import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rezervacija } from 'src/models/rezervacija';

@Injectable({
  providedIn: 'root'
})
export class RezervacijaService {

  constructor(private http: HttpClient) { }

  dohvatiSveRezervacije() {

    return this.http.get<Rezervacija[]>("http://localhost:8080/rezervacije/dohvatisverezervacije");
  }

  dohvSveKomentareRestorana(idres: number) {
    return this.http.get<string[]>(`http://localhost:8080/rezervacije/dohvatisvekomentarerestorana/${idres}`);
    
  }

  dodajRezervaciju(rez: Rezervacija) {
    return this.http.post<boolean>("http://localhost:8080/rezervacije/dodajrezervaciju",rez);
  }

  dohvatiSveRezervacijeRestorana(res: number) {
    return this.http.get<Rezervacija[]>(`http://localhost:8080/rezervacije/dohvsverezervacijerestorana/${res}`)
  }

  prihvatiRezervaciju(rez: Rezervacija) {
    return this.http.post<boolean>('http://localhost:8080/rezervacije/prihvatirezervaciju', rez)
  } 
  prihvatiRezervacijuSaStolom(rez: Rezervacija) {
    return this.http.post<boolean>('http://localhost:8080/rezervacije/prihvatirezervacijusastolom',rez);
  }


  odbijRezervaciju(rez: Rezervacija) {
    return this.http.post<boolean>('http://localhost:8080/rezervacije/odbijrezervaciju', rez)
  }

  oceniRezervaciju(rez: Rezervacija) {

    return this.http.post<boolean>('http://localhost:8080/rezervacije/ocenirezervaciju', rez);
    
  }

  otkaziRezervaciju(idrez: number) {
    return this.http.get<boolean>(`http://localhost:8080/rezervacije/otkazirezervaciju/${idrez}`);


  }
  prijaviDolazak(idrez: number) {

    return this.http.get<boolean>(`http://localhost:8080/rezervacije/prisustvovaorezervaciji/${idrez}`);
  }

  produziRezervaciju(idrez: number) {

    return this.http.get<boolean>(`http://localhost:8080/rezervacije/produzirezervaciju/${idrez}`);
    
  }
 
 
}
