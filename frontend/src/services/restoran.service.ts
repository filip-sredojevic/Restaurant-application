import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restoran } from 'src/models/restoran';


@Injectable({
  providedIn: 'root'
})
export class RestoranService {

  constructor(private http: HttpClient) { }
  idrestorana: number=0;

 
   dohvatiIdRestorana() {
    this.idrestorana++;
    return this.idrestorana;
   }
  dohvatiBrojRestorana() {
    return this.http.get<number>('http://localhost:8080/restorani/dohvatibrojrestorana');
  }

 

  dodajrestoran(restoran: Restoran){

    return this.http.post<boolean>('http://localhost:8080/restorani/dodajrestoran', restoran);
  }

  dohvsverestorane(){
    return this.http.get<Restoran[]>('http://localhost:8080/restorani/dohvsverestorane');
  }


  

  dohvatiRestoran(id: number) {
    return this.http.get<Restoran>(`http://localhost:8080/restorani/dohvatirestoran/${id}`)
  }


}
