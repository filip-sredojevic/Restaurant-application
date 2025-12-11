import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { Restoran } from 'src/models/restoran';
import { Rezervacija } from 'src/models/rezervacija';
import { Tip } from 'src/models/tip';
import { KorisnikService } from 'src/services/korisnik.service';
import { RestoranService } from 'src/services/restoran.service';
import { RezervacijaService } from 'src/services/rezervacija.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit{

  helper: string="administrator";
  sifra: string=""
  tipkorisnika: string="";
  message: string="";
 
  pi: string=""; pt: string=""; pa: string="";
  
  brojGostiju: number=0;
  konobari: Korisnik[]=[];
  restorani: Restoran[]=[];
  rezervacije: Rezervacija[]=[];
  vreme: number=0;
   n24h: number=0;
   n7d: number=0;
   n1m: number=0;
  nacinsortiranja: string=""
  constructor(private router: Router,private rezervacija_servis: RezervacijaService, private korisnik_servis: KorisnikService, private restoran_servis: RestoranService){}

  ngOnInit(): void {
     this.korisnik_servis.dohvatibrojGostiju().subscribe((data: number)=>{this.brojGostiju=data;})
     this.korisnik_servis.dohvatiSveKonobare().subscribe((data: Korisnik[])=>{this.konobari=data;})  
     this.restoran_servis.dohvsverestorane().subscribe((data: Restoran[])=>{this.restorani=data;})
     this.rezervacija_servis.dohvatiSveRezervacije().subscribe((data: Rezervacija[])=>{this.rezervacije=data; this.prebrojRez();})
  
  }

  dodaj(res: Restoran) {
   // return res.sto1;
   return 0;
  }

  sortirajRastuce() {
    
    this.restorani.sort((a, b) => {
   
        var x; var y;
      if(this.nacinsortiranja=="naziv") { x = a.naziv_restorana; y = b.naziv_restorana;}
      else if(this.nacinsortiranja=="tip") {x=a.tip_restorana; y=b.tip_restorana;}
      else  {x=a.adresa_restorana; y=b.adresa_restorana;}
      
      if (x< y) {
        return -1; // A treba da dođe pre B
      }
      if (x > y) {
        return 1; // B treba da dođe pre A
      }
      
      return 0; // A i B su jednaki
    });

  }

  sortirajOpadajuce() {
    
    this.restorani.sort((a, b) => {
   
      var x; var y;
    if(this.nacinsortiranja=="naziv") { x = a.naziv_restorana; y = b.naziv_restorana;}
    else if(this.nacinsortiranja=="tip") {x=a.tip_restorana; y=b.tip_restorana;}
    else  {x=a.adresa_restorana; y=b.adresa_restorana;}
    
    if (x< y) {
      return 1; // A treba da dođe pre B
    }
    if (x > y) {
      return -1; // B treba da dođe pre A
    }
    
    return 0; // A i B su jednaki
  });



  }

  proveriDaLiKonobarRadiUrestoranu(res: Restoran, kon: Korisnik) {
    if(res.id_restorana===kon.id_restorana) return true;
    return false;
  } 
  prebrojRez() {

    for(var i=0;i<this.rezervacije.length; i++) {
      if(((new Date().getTime()-new Date(this.rezervacije[i].datum).getTime())*1.0/1000/3600)<24) this.n24h++;
      if(((new Date().getTime()-new Date(this.rezervacije[i].datum).getTime()))*1.0/1000/3600<7*24) this.n7d++;
      if(((new Date().getTime()-new Date(this.rezervacije[i].datum).getTime()))*1.0/1000/3600<30*24) this.n1m++;
        }
      }
    
  
  login(){

             let x1=localStorage.getItem("ulogovankonobar");
             let x2=localStorage.getItem("ulogovangost");
           
              if(this.tipkorisnika =="konobar" && x1!=null) {
                this.router.navigate(['konobar']);
              }
              else if(this.tipkorisnika == "gost" && x2!=null) {
                this.router.navigate(['gost']);
              }
             //
         else  if(this.tipkorisnika=="konobar" || this.tipkorisnika=="gost") {
             // Novo

           
             //
            
            localStorage.setItem("tipkorisnika",JSON.stringify(new Tip(this.tipkorisnika)));
            this.router.navigate(['login'])
         }
  }
  proveri(){
       if(this.sifra!="adm123") {this.message="Uneli ste pogresnu lozinku. Molimo pokusajte ponovo."}
       else {
        //Novo
        let x=localStorage.getItem("ulogovanadministrator");
        if(x!=null) {this.router.navigate(['administrator']);}
        else {
         //Novo
         localStorage.setItem("tipkorisnika", JSON.stringify(new Tip("administrator")));
        this.router.navigate(['prijavaadministratora'])}
        }
      } 

      pretrazi() {
    
        if(this.pi!="") {this.restorani=this.restorani.filter(x=>x.naziv_restorana==this.pi);}
        if(this.pt!="") {this.restorani=this.restorani.filter(x=>x.tip_restorana==this.pt);}
        if(this.pa!="") {this.restorani=this.restorani.filter(x=>x.adresa_restorana==this.pa);}
      }
      promenilozinku() {

        this.router.navigate(['promenalozinke']);

      }

}
