import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Korisnik } from 'src/models/korisnik';
import { Tip } from 'src/models/tip';
import { ImageService } from 'src/services/image.service';
import { KorisnikService } from 'src/services/korisnik.service';
import { PomocniService } from 'src/services/pomocni.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  korisnicko_ime: string="";
  lozinka: string="";
  tip: string="";
  bezbedonosno_pitanje: string="";
  odgovor: string="";
  ime: string="";
  prezime: string="";
  pol: string="";
  adresa: string="";
  telefon: string="";
  mejl: string="";
  profilna_slika: number=0;
  brojkreditnekartice: string="";
  message: string="";

  helper: number=0;
  result: boolean=false;
  tipklasa: Tip=new Tip("");


 korisnickaimena: string[]=[];
 odbijenemejladrese: string[]=[]; 

 selectedFile!: File;

  constructor(private servis: KorisnikService, private imageservis: ImageService,private pomocni: PomocniService, private router: Router){}


  ngOnInit(): void {
    this.profilna_slika=0; this.helper=0;
    let x=localStorage.getItem('tipkorisnika');
     if(x!=null) {this.tipklasa=JSON.parse(x); this.tip=this.tipklasa.tip;}
     localStorage.setItem("uploadedImage", "assets/defaultimage.png");
     this.pomocni.dohvatiSvaKorisnickaImena().subscribe(
      (data: string[])=>{
               this.korisnickaimena=data;
      }
     );
     this.pomocni.dohvatisveOdbijeneMejlAdrese().subscribe(
      (data: string[])=>{
        this.odbijenemejladrese=data;
      }
     )
  }


  onFileSelected(event: any) {
   const file: File = event.target.files[0]; this.selectedFile=file; 
   const minDimension = 100; // Minimalna dimenzija slike (u pikselima)
   const maxDimension = 300; // Maksimalna dimenzija slike (u pikselima)
 
   const allowedTypes = ['image/jpeg', 'image/png']; // Dozvoljeni tipovi slika

  // Provera tipa datoteke
   if (!allowedTypes.includes(file.type)) {
    this.message="Neispravan format slike. Molimo izaberite sliku u formatu JPG ili PNG.";
    return;
   }
 
 
   // Kreiranje novog Image objekta
   const img: HTMLImageElement = new Image();
   img.onload = () => {
  
     const width = img.width;
     const height = img.height;
    

     // Provera minimalne dimenzije
     if (width < minDimension || height < minDimension) {
      this.message=`Slika je premala. Minimalna dimenzija slike je ${minDimension}x${minDimension} piksela.`;
       return;
     }
 
     // Provera maksimalne dimenzije
     if (width > maxDimension || height > maxDimension) {
       this.message=`Slika je prevelika. Maksimalna dimenzija slike je ${maxDimension}x${maxDimension} piksela.`;
       return;
     }
 
    };
 
    this.profilna_slika=1;
    
    //Ovo omogucava poziv funkcije img.onload()
    img.src = URL.createObjectURL(file);
   
  }

  uploadImage(key: string) {
   

    this.imageservis.uploadImage(this.selectedFile, key).subscribe(
      (data: boolean)=>{
        if(data==true) {alert("slika je uspesno stavljena");}
      }
  
    )
    
  }

 
  getImageFromLocalStorage() {
    return localStorage.getItem(this.korisnicko_ime+'uploadedImage');
  }

  postojimejl(){
    for(var i=0; i<this.odbijenemejladrese.length; i++){
      if(this.odbijenemejladrese[i]==this.mejl) return true;
    }
    return false;
  }


  proverilozinku(lozinka: string) {
    var reg=/^(?=[a-zA-Z])(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).{6,10}$/;
      return reg.test(lozinka);
  }

  proverimejl(mejl: string){
     var reg=/\w*@\w*/
     return reg.test(mejl);
  }

  provera: string="";
   posalji() {
    console.log("Filip");

   if(this.korisnicko_ime=="") {this.message="Niste uneli korisnicko ime!";}
   else if(this.postojiKorisnickoIme()) { this.message="Korisnicko ime vec postoji!";}
    else if(this.lozinka=="") {this.message="Niste uneli lozinku!";}
    else if(this.proverilozinku(this.lozinka)==false) { this.message="Lozinka nije u odgovarajucem formatu!";}
    else if(this.bezbedonosno_pitanje=="") {this.message="Niste uneli bezbedonosno pitanje!";}
    else if(this.odgovor=="") {this.message="Niste uneli odgovor na bezbedonosno pitanje!";}
    else if(this.ime=="") {this.message="Niste uneli ime!";}
    else if(this.prezime=="") {this.message="Niste uneli prezime!";}
    else if(this.pol=="") {this.message="Niste uneli pol!";}
    else if(this.adresa=="") {this.message="Niste uneli adresu!";}
    else if(this.telefon=="") {this.message="Niste uneli telefon!";}
    else if(this.mejl=="") {this.message="Niste uneli mejl!";}
    else if(this.postojimejl()) {this.message="Mejl je zauzet, molimo Vas izaberite drugi";}
    else if(!this.proverimejl(this.mejl)) {this.message="Mejl ne zadovoljava odgovarajuci format";}
    else if(this.brojkreditnekartice=="") {this.message="Niste uneli broj kreditne kartice!";}
    else {
      //this.provera="poslat zahttev";
      this.uploadImage(this.korisnicko_ime);
      this.servis.dodajZahtev(new Korisnik(this.korisnicko_ime,this.encrtpt_decrypt(this.lozinka), this.bezbedonosno_pitanje, this.odgovor, this.ime, this.prezime,
      this.pol, this.adresa, this.telefon, this.mejl, this.brojkreditnekartice,this.profilna_slika,0,0,this.tip,0)).subscribe(
          (data: boolean)=>{                                                       //za obicnog korisnika idres je irelevantno
            this.message="stigao je odgovor";                                      //za obicnog korisnika na pocetku je broj nepojavljivanja 0 
            if(data==true) {this.helper=1; this.message="Zahtev sa pristupanje sistemu je uspesno dodat!";} 
          }
        )  


  }
  }
  encrtpt_decrypt(inputString: string): string {
    return inputString.split('').reverse().join('');
  }

  pocetna() {
    this.router.navigate(['']);
  }

  postojiKorisnickoIme(): boolean {
    for(var i=0; i<this.korisnickaimena.length; i++) {
      if(this.korisnickaimena[i]==this.korisnicko_ime) return true;
    }
    return false;
  }


}
