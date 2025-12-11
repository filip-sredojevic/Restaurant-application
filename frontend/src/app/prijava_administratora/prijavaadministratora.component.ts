import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { KorisnikService } from 'src/services/korisnik.service';

@Component({
  selector: 'app-prijavaadministratora',
  templateUrl: './prijavaadministratora.component.html',
  styleUrls: ['./prijavaadministratora.component.css']
})
export class PrijavaadministratoraComponent {

  korisnicko_ime: string="";
  lozinka: string="";
  message: string="";
  ulogovan_administrator: Korisnik | null=null;
  constructor(private servis: KorisnikService, private router: Router){}



  posalji() {

    if(this.korisnicko_ime=="") {this.message="Niste uneli korisnicko ime!";}
    else if(this.lozinka=="") {this.message="Niste uneli lozinku";}
    else {
      this.servis.prijava(new Korisnik(this.korisnicko_ime, this.encrtpt_decrypt(this.lozinka), "","","","","","","","","",0,0,0,"administrator",0)).subscribe(
        (data: Korisnik)=>{
             if(data!=null) {
              this.ulogovan_administrator=data; localStorage.setItem("ulogovanadministrator", JSON.stringify(this.ulogovan_administrator));
              this.router.navigate(['administrator']);
             }
             else {
              this.message="Ne postoji takav korisnik!"
             }
        }
      )
    }
  }

  encrtpt_decrypt(inputString: string): string {
    return inputString.split('').reverse().join('');
  }

}
