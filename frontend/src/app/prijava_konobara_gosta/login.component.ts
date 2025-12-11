import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { Tip } from 'src/models/tip';
import { KorisnikService } from 'src/services/korisnik.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


 korisnicko_ime: string="";
 lozinka: string="";
 ulogovan: Korisnik | null=null;
 tipkorisnika: string="";

 message: string="";
 tipklasa: Tip=new Tip("");
 constructor(private router: Router, private servis: KorisnikService){}  
    
 
  hel: string="konobar";
 registrujse(){
  this.router.navigate(['registracija'])
 }

 ngOnInit() {
  let x=localStorage.getItem("tipkorisnika");
   if(x!=null) {this.tipklasa=JSON.parse(x); this.tipkorisnika=this.tipklasa.tip;}
 }

 ulogujse() {
  
   //let x=localStorage.getItem("tipkorisnika");
  // if(x!=null) {this.tipklasa=JSON.parse(x); this.tipkorisnika=this.tipklasa.tip;}
    this.servis.prijava(new Korisnik(this.korisnicko_ime, this.encrtpt_decrypt(this.lozinka), "","","","","","","","","",0,0,0,this.tipkorisnika,0)).subscribe(
      (data: Korisnik)=>{
       if(data!=null){ this.ulogovan=data;
        //this.message="Stigao odgovor";
       
        if(this.tipkorisnika=="konobar") {
          localStorage.setItem("ulogovankonobar", JSON.stringify(this.ulogovan));
          this.router.navigate(['konobar']);
        }
        else {
          localStorage.setItem("ulogovangost", JSON.stringify(this.ulogovan));
          this.router.navigate(['gost']);
        }
      }
      else {
        this.message="Takav korisnik ne postoji u bazi"
      }
    }
    
    )
    
 }



 encrtpt_decrypt(inputString: string): string {
//  console.log(this.tipkorisnika);
  // this.message="Lozinka je enkriptovana"  
   return inputString.split('').reverse().join('');
}

pocetna() {
  this.router.navigate(['']);
}
}










