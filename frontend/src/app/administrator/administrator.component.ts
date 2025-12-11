import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { Restoran } from 'src/models/restoran';
import { Tip } from 'src/models/tip';
import { ImageService } from 'src/services/image.service';
import { KorisnikService } from 'src/services/korisnik.service';
import { PomocniService } from 'src/services/pomocni.service';
import { RestoranService } from 'src/services/restoran.service';
import { ZahteviService } from 'src/services/zahtevi.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit{

  h1: string="Zahtevi"; h2: string="Gosti"; h3: string="Konobari"; h4: string="Restorani";

  ulogovan_administrator: Korisnik = new Korisnik("", "", "","","","","","","","","",0,0,0,"administrator",0) ;
  helper: string="";
  imageUrl: string=""
  imagepath: string="";
  message: string="";
  zahtevi: Korisnik[]=[];
  gosti: Korisnik[]=[];
  konobari: Korisnik[]=[];
  restorani: Restoran[]=[];//new RestoranWrapper(0, [''],[0],0,0);
  izabrano: string="";
  constructor(private imageservice: ImageService,private korisnik_servis: KorisnikService, private restoran_servis: RestoranService, private zahtev_servis: ZahteviService, private pomocni_servis: PomocniService, private router:Router){}
  ngOnInit(): void
   { 

        let x=localStorage.getItem("ulogovanadministrator");
        if(x!=null) {  this.ulogovan_administrator=JSON.parse(x);
         this.zahtev_servis.dohvatiSveZahteve().subscribe(
          (data: Korisnik[])=>{
            this.zahtevi=data;
          }
         );
         this.korisnik_servis.dohvatiSveGoste().subscribe(
          (data: Korisnik[])=>{
                       this.gosti=data;
          }
         );
         this.korisnik_servis.dohvatiSveKonobare().subscribe(
          (data: Korisnik[])=>{
            this.konobari=data;
          }
         );
         this.restoran_servis.dohvsverestorane().subscribe(
          (data: Restoran[])=>{
            this.restorani=data;
          }
         );
        // this.mojrestoran=this.restoran_servis.dohvatiRestoranZaDatiId(1);
         
       
      }

       

  }
  postpodrslikubazu() {
    this.imageservice.uploadDefaultImage("defaultimage");
    //this.imageservice.uploadDefaultImage("jelo");
  }
  dodajkonobara() {
   
    this.router.navigate(['dodavanjekonobara']);

  }
  promeniLozinku(){
    localStorage.setItem("promenalozinke", JSON.stringify(this.ulogovan_administrator));
    this.router.navigate(['promenalozinke']);
  }

  prihvati(zahtev: Korisnik){
    this.pomocni_servis.prihvatizahtev(zahtev).subscribe(
      (data: boolean)=>{
        if(data==true) this.ngOnInit();
      }
    )

  }

  odbij(zahtev: Korisnik){

    this.pomocni_servis.odbijzahtev(zahtev).subscribe(
      (data: boolean)=>{
        if(data==true) this.ngOnInit();
      }
    )
  }

  pocetna(){
    this.router.navigate(['']);
  }


  aktiviraj(gost: Korisnik){
    this.korisnik_servis.odblokirajGosta(gost).subscribe(
      (data: boolean)=>{
        if(data==true) {
          this.ngOnInit();
          this.message="Korisnik je uspesno odblokiran!";
        }
      }
    )

  }
  deaktiviraj(gost: Korisnik){

    this.korisnik_servis.blokirajGosta(gost).subscribe(
      (data: boolean)=>{
        if(data==true) {
          this.ngOnInit();
          this.message="Korisnik je uspesno blokiran!";
          localStorage.removeItem('ulogovangost');
        }
      }
    )
  }


  zahtev(){
    this.izabrano="Zahtevi";

  }

  gost(){
    this.izabrano="Gosti";

  }

  konobar(){

    this.izabrano="Konobari";

  }

  restoran(){
    this.izabrano="Restorani"

  }

  izlogujse(){
    localStorage.removeItem("ulogovanadministrator");
    this.router.navigate(['']);
  }


  azuriraj(gost: Korisnik){
    localStorage.setItem("koseazurira",JSON.stringify(gost));
    localStorage.setItem("koazurira",JSON.stringify(new Tip("administrator")));
    this.router.navigate(["azuriranjepodataka"]);


    
  }

  dodajrestoran(){
    this.router.navigate(['dodavanjerestorana'])

  }

}
