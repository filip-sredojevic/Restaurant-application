import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { KorisnikService } from 'src/services/korisnik.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {
    nacinpromene: string="";
 
 
    h1: string="stara lozinka"; h2: string="bezbedonosno pitanje"; h3: string="";
 
    //Promena lozinke koristeci staru lozinku
    staralozinka: string="";
    novalozinka: string="";
    novalozinkaponovo: string="";
    korisnik: Korisnik=new Korisnik("", "", "","","","","","","","","",0,0,0,"",0);

    message: string="";
    staraok: boolean=false;
    novaok: boolean=false;

    //promena lozinke koristeci bezbedonosno pitanje
    kime: string="";
    kimeok: boolean=false;
    odg: string="";
    odgok: boolean=false;
    nl: string="";
    nlp: string="";

    constructor(private korisnik_servis: KorisnikService, private router: Router){}
    ngOnInit() {
   
      
     /* let x=localStorage.getItem("promenalozinke");
      if(x!=null) {
        this.korisnik=JSON.parse(x);
      }*/
   }
   korime(){

     this.korisnik_servis.dohvatiKorisnikaZaZadatoKime(this.kime).subscribe(
      (data: Korisnik)=>{
        if(data!=null) {this.korisnik=data; this.kimeok=true;}
        else {
          alert("Takav korisnik ne postoji!"); this.kimeok=false;return;
        }
      }
     )
   }

   odgovori() {
    if(this.odg!=this.korisnik.bezbedonosni_odgovor) {
       this.message="Odgovor na bezbedonosno pitanje nije zadovoljavajuc!";
    }
    else {
      this.message="";
      this.odgok=true;
    }
   }

   proloz(){
    if(this.nl!=this.nlp){
      this.message="Lozinke moraju biti iste!";
    }
    else if(!this.proverilozinku(this.nl)) {this.message="Lozinka nije u odgovarajucem formatu!";}
    else {
      this.message="";
      this.korisnik.lozinka=this.encrtpt_decrypt(this.nl);
      this.korisnik_servis.promeniLozinku(this.korisnik).subscribe(
        (data: boolean)=>{
          if(data==true) {this.router.navigate(['']);}
        }
      );
  
      }
    }
   
  



   stara(){
    if(this.encrtpt_decrypt(this.staralozinka)!=this.korisnik.lozinka) {
    this.message="Niste uneli ispravnu staru lozinku!";
    this.staraok=false;
    }
    else {
      this.message="";
      this.staraok=true;
    }
  }
    novaponovolozinka(){

      if(this.novalozinkaponovo!=this.novalozinka){
        this.message="Lozinke moraju da budu iste!";
        this.novaok=false;
      }
      else {
        this.message="";
        this.novaok=true;
      }
    }

    promenilozinku() {

      if(!this.proverilozinku(this.novalozinka)) {this.message="Lozinka nije u odgovarajucem formatu!";this.novaok=false;}
      else {
         
        this.korisnik.lozinka=this.encrtpt_decrypt(this.novalozinka);
         this.korisnik_servis.promeniLozinku(this.korisnik).subscribe(
            (data: boolean)=>{
              if(data==true) {
                this.router.navigate(['']);
              }

            }
         )
      }


    }

    proverilozinku(lozinka: string) {
      var reg=/^(?=[a-zA-Z])(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).{6,10}$/;
        return reg.test(lozinka);
    }
    encrtpt_decrypt(inputString: string): string {
      return inputString.split('').reverse().join('');
    }
   }

  


