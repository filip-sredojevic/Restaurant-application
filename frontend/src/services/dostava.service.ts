import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dostava } from 'src/models/Dostava';

@Injectable({
  providedIn: 'root'
})
export class DostavaService {

  constructor(private http: HttpClient) { }

  dohvatiDostaveGosta(idgost: string) {
    return this.http.post<Dostava[]>("http://localhost:8080/dostave/dohvdostavegosta", idgost);
  }

  dohvatiDistaveRestorana(idres: number) {
    return this.http.get<Dostava[]>(`http://localhost:8080/dostave/dohvsvedostaverestorana/${idres}`);
  }

  prihvatiDostavu(dostava: Dostava) {

  return this.http.post<boolean>('http://localhost:8080/dostave/prihvatidostavu', dostava);
    
  }
}
