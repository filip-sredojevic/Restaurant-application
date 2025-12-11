import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dostava } from 'src/models/Dostava';
import { Jelo } from 'src/models/Jelo';
import { Korpa } from 'src/models/Korpa';
import { Korisnik } from 'src/models/korisnik';
import { Restoran } from 'src/models/restoran';
import { Rezervacija } from 'src/models/rezervacija';
import { JelovnikService } from 'src/services/jelovnik.service';
import { KorisnikService } from 'src/services/korisnik.service';
import { KorpeService } from 'src/services/korpe.service';
import { PomocniService } from 'src/services/pomocni.service';
import { RezervacijaService } from 'src/services/rezervacija.service';

@Component({
  selector: 'app-prikazrestorana',
  templateUrl: './prikazrestorana.component.html',
  styleUrls: ['./prikazrestorana.component.css']
})
export class PrikazrestoranaComponent implements OnInit {
 h1: boolean=false; 
  helper: string="Forma";
  datum: string=""; vreme: string=""; brosoba: number=0;
  restoran: Restoran = new Restoran(0,"","","","","","","","","",0);
  kontaktosoba: Korisnik =new Korisnik("", "", "","","","","","","","","",0,0,0,"",0);
  message: string="";
  komentari: string[]=[];
  gost: Korisnik=new Korisnik("", "", "","","","","","","","","",0,0,0,"",0);
  nacinrez: string="";
  rezervacije: Rezervacija[]=[];
  dodatno: string="";
  poglkor: boolean=false;
   jelarestorana: Jelo[]=[];

   sadrzajkorpe: Korpa[]=[];
   kolicina: number=0;

   brslobmesta: number[]=[];

   radvreres: string[]=[];

  constructor(private pomocni_servis:PomocniService,private korpa_servis:KorpeService,private korisnik_servis: KorisnikService, private jservis: JelovnikService,private router: Router, private rezervacija_servis: RezervacijaService){}
  ngOnInit(): void {
    let x=localStorage.getItem('odabranirestoran');
    if(x!=null) {
      this.restoran=JSON.parse(x);
      this.radvreres=this.restoran.radno_vreme.split(";");
      var stolovimesta: string[]=this.restoran.brmesta.split(",");
      for(var i=0; i<6;i++) {
        this.brslobmesta[i]=parseInt(stolovimesta[i]);
      }
    
    }
    let y=localStorage.getItem("ulogovangost");
    if(y!=null) {
      this.gost=JSON.parse(y);
    }
    this.korisnik_servis.dohvatiKorisnikaZaZadatoKime(this.restoran.kontakt_osoba).subscribe(
      (data: Korisnik)=>{
        this.kontaktosoba=data; 
      }
    );
    this.rezervacija_servis.dohvSveKomentareRestorana(this.restoran.id_restorana).subscribe(
      (data: string[])=>{
        this.komentari=data;
      }
    );
    this.rezervacija_servis.dohvatiSveRezervacije().subscribe((data: Rezervacija[])=>{this.rezervacije=data;});
    this.jservis.dohvatiSvaJelaRestorana(this.restoran.id_restorana).subscribe((data: Jelo[])=>{this.jelarestorana=data;})
   }
   dodajukorpu(jelo: Jelo) {
     if(jelo.kolicina==0) {alert("Morate uneti kolicinu!"); return;}
    this.korpa_servis.dodajUKorpu(new Korpa(0,this.gost.korisnicko_ime,this.restoran.id_restorana,jelo.naziv_jela,jelo.sastojci,jelo.cena,"",jelo.kolicina)).subscribe(
      (data: boolean)=>{
        if(data==true) alert("Uspeno je dodato u korpu!")
      }
    )  
    
   }
   naruci() {
     var iznosnarudzbine: number=0;
     for(var i=0; i<this.sadrzajkorpe.length; i++) {
      iznosnarudzbine+=this.sadrzajkorpe[i].cena*this.sadrzajkorpe[i].kolicina;
     }
     this.pomocni_servis.dodajDostavu(new Dostava(0, this.restoran.id_restorana, this.restoran.naziv_restorana, this.gost.korisnicko_ime, iznosnarudzbine, "X", "neobradjeno", '2000-01-01T00:00:00', "",this.gost.adresa,"2000-01-01T00:00:00")).subscribe(
      (data: boolean)=>{
        if(data==true) {
          alert("Dostava je uspesno dodata!");
        }
      }
     )

   }
   dohvsliku(jelo: Jelo) {
    if(jelo.naziv_jela==="pita sa sirom") return "assets/pita.jpg";
    if(jelo.naziv_jela==="becka") return "assets/becka.jpg";
    if(jelo.naziv_jela==="knedle") return "assets/knedle.jpg";
    if(jelo.naziv_jela==="francuski ders") return "assets/supa.jpg";
    if(jelo.naziv_jela=="filete od soma") return "assets/som.jpg";
    if(jelo.naziv_jela=="kajgana") return "assets/kajgana.jpg";
    if(jelo.naziv_jela=="torta sa jagodama") return "assets/torta.jpg";
    if(jelo.naziv_jela=="Coca-cola") return "assets/cocacola.jpg" 
    if(jelo.naziv_jela=="pivo") return "assets/pivo.jpg"
    return "assets/jelo.jpg";
   }

  izbaci(korpa: Korpa) {
    this.korpa_servis.ukloniKoruGosta(korpa).subscribe((data: Korpa[])=>{this.sadrzajkorpe=data;})

  }
   formapanel() {
    if(this.nacinrez=="Panel") {
      
      localStorage.setItem('gledacanvas', JSON.stringify(this.gost)); //NOVO
      this.router.navigate(['canvas']);
    }
   }
  
   rezervisi() {
   
    var vremerezervacije: string=this.datum+"T"+this.vreme+ ":00";
    var praznomesto: boolean=true;

    //Provera da li restoran radi u zadato vreme
    var dan: number=new Date(vremerezervacije).getDay(); 
    var sledan: number= (new Date(vremerezervacije).getDay()+1)%7//redni broj dana u sedmici 
    var rv: string[]=this.radvreres[dan].split(","); 
    var sat: number=new Date(vremerezervacije).getHours();
    for(var i=0; i<3; i++) {
      
        var radi: boolean=false;
       for(var j=0;j<rv.length; j++) {
        var x: string[]=rv[j].split(":");
        var p: number=parseInt(x[0]); var k: number=parseInt(x[1]);
        if( (sat+i)%24>=p && (sat+i)%24<=k) {radi=true; break;}
       }
       if(radi==false) {
        this.message="Restoran ne radi u zadato vreme!"; return;
       } 
    }
    


    //Novo

for(var j=0; j<6; j++) {

  for (var i=0; i<this.rezervacije.length; i++) {
    if(this.rezervacije[i].id_res!=this.restoran.id_restorana) continue;
    if(this.brslobmesta[j]<this.brosoba || ( this.rezervacije[i].broj_stola==j && (this.rezervacije[i].status==='rezervisan' || this.rezervacije[i].status==='na cekanju') 
         &&  Math.abs(new Date(this.rezervacije[i].datum).getTime()-new Date(vremerezervacije).getTime())<(3+this.rezervacije[i].produzena)*3600*1000)) {
        praznomesto=false; break;
      } 

}
if(praznomesto==true) {                                                                                       //Novo Stajalo j umesto -1
  this.rezervacija_servis.dodajRezervaciju(new Rezervacija(0,this.restoran.id_restorana,this.gost.korisnicko_ime,-1,this.brosoba,vremerezervacije,
    "na cekanju",'N','F', 0, "X", this.dodatno, 0,0)).subscribe(
      (data: boolean)=>{
        this.h1=true;
        this.message="Rezervacija je uspesno dodata!";
        this.ngOnInit();
      }
    )
 
  return;
  }

}
   alert("Ne posotji slobodan sto za zadati broj osoba u zadato vreme");
  
}
    //Novo


   pocetna() {
    this.router.navigate([""])
     }
     pogledajkorpu() {
         this.korpa_servis.dohvatiKorpuGosta(this.gost.korisnicko_ime, this.restoran.id_restorana).subscribe(
          (data: Korpa[])=>{
            this.sadrzajkorpe=data;
            this.poglkor=true;
          }
         )
      
     }
}
