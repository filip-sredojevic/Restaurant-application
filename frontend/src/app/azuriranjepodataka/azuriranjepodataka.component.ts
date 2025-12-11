import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { ImageService } from 'src/services/image.service';
import { KorisnikService } from 'src/services/korisnik.service';
import { PomocniService } from 'src/services/pomocni.service';

@Component({
  selector: 'app-azuriranjepodataka',
  templateUrl: './azuriranjepodataka.component.html',
  styleUrls: ['./azuriranjepodataka.component.css']
})
export class AzuriranjepodatakaComponent implements OnInit {
 
  h1: string="gost"

  novoime: string="";
  novoprezime: string="";
  novaadresa: string="";
  novmejl: string="";
  novtelefon: string="";
  novbroj_kkartice: string="";


  kosemenja: Korisnik=new Korisnik("", "", "","","","","","","","","",0,0,0,"",0);
  komenja: string="";

  message: string="";
  helper: number=0;

  odbijenemejladrese: string[]=[];

  selectedFile!: File;

  promeniosliku: boolean=false;
  constructor(private korisnik_servis: KorisnikService, private imageservis: ImageService, private pomocni: PomocniService,private router: Router){}

  ngOnInit(): void {
    let x=localStorage.getItem("koseazurira");
    if(x!=null) {this.kosemenja=JSON.parse(x);}
    let y=localStorage.getItem("koazurira");
    if(y!=null ){this.komenja=JSON.parse(y).tip;}

    this.pomocni.dohvatisveOdbijeneMejlAdrese().subscribe(
      (data: string[])=>{
        this.odbijenemejladrese=data;
      }
     )

  }

  postojimejl(){
    for(var i=0; i<this.odbijenemejladrese.length; i++){
      if(this.odbijenemejladrese[i]==this.novmejl) return true;
    }
    return false;
  }
  

  onFileSelected(event: any) {
    const file: File = event.target.files[0]; this.selectedFile=file;
    const minDimension = 100; // Minimalna dimenzija slike (u pikselima)
    const maxDimension = 300; // Maksimalna dimenzija slike (u pikselima)
  
    const allowedTypes = ['image/jpeg', 'image/png']; // Dozvoljeni tipovi slika
 
   // Provera tipa datoteke
    if (!allowedTypes.includes(file.type)) {
     this.message='Neispravan format slike. Molimo izaberite sliku u formatu JPG ili PNG.';
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
    this.message="";
    this.promeniosliku=true;
    this.kosemenja.profilna_slika=1;
  
    img.src = URL.createObjectURL(file);
 
   }

   posalji() {
    if(this.postojimejl()) {this.message="Mejl je zauzet. Molimo vas izaberite drugi!"; return;}

    if(this.novoime!="") {this.kosemenja.ime=this.novoime;}
    if(this.novoprezime!="") {this.kosemenja.prezime=this.novoprezime;}
    if(this.novaadresa!="") {this.kosemenja.adresa=this.novaadresa;}
    if(this.novmejl!="") {this.kosemenja.mejl=this.novmejl;}
    if(this.novtelefon!="") {this.kosemenja.telefon=this.novtelefon;}
    if(this.novbroj_kkartice!=""){this.kosemenja.broj_kkartice=this.novbroj_kkartice;}
    this.message="";
    //Ako administrator menja podatke onda slika sigurno ne treba da se azurira
    if(this.promeniosliku==true) {this.uploadImage(this.kosemenja.korisnicko_ime); }
    this.korisnik_servis.azurirajPodatke(this.kosemenja).subscribe(
      (data: boolean)=>{
        if(data==true){
          this.helper=1;
          this.message="Podaci su uspesno azurirani!"


          setTimeout(() => {
            this.pocetna();
          }, 2000); // 2000 milisekundi = 2 sekunde



         }
        })
  

      
      }

      uploadImage(key: string) {
   

        this.imageservis.uploadImage(this.selectedFile, key).subscribe(
          (data: boolean)=>{
            if(data==true) {}
          }
      
        )
        
      }
    

   pocetna(){
   if(this.kosemenja.tip=="gost") { localStorage.setItem('ulogovangost', JSON.stringify(this.kosemenja));}
   if(this.kosemenja.tip=="konobar") { localStorage.setItem('ulogovankonobar', JSON.stringify(this.kosemenja));}
    this.router.navigate(['']);
   }


}
