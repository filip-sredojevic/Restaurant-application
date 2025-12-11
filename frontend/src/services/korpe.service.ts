import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korpa } from 'src/models/Korpa';

@Injectable({
  providedIn: 'root'
})
export class KorpeService {

  constructor(private http: HttpClient) { }


  dodajUKorpu(kor: Korpa) {
             return this.http.post<boolean>("http://localhost:8080/korpe/dodajukorpu",kor);
  }

  dohvatiKorpuGosta(idgost: string, idres: number) {
    return this.http.get<Korpa[]>(`http://localhost:8080/korpe/dohvatikorpugosta/${idgost}/${idres}`);
  }
  ukloniKoruGosta(korpa: Korpa) {
     
    return this.http.post<Korpa[]>('http://localhost:8080/korpe/uklonikopru', korpa);

  }

}
