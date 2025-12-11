import { Component, ElementRef, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Dostava } from 'src/models/Dostava';
import { Korisnik } from 'src/models/korisnik';
import { Restoran } from 'src/models/restoran';
import { Rezervacija } from 'src/models/rezervacija';
import { Tip } from 'src/models/tip';
import { DostavaService } from 'src/services/dostava.service';
import { ImageService } from 'src/services/image.service';
import { JelovnikService } from 'src/services/jelovnik.service';
import { KorisnikService } from 'src/services/korisnik.service';
import { RestoranService } from 'src/services/restoran.service';
import { RezervacijaService } from 'src/services/rezervacija.service';

@Component({
  selector: 'app-gost',
  templateUrl: './gost.component.html',
  styleUrls: ['./gost.component.css']
})
export class GostComponent  implements OnInit{
  
   h1: string="Profil"; h2: string="Restorani"; h3: string="Rezervacije"; h4: string="Dostava hrane"
  ulogovan_gost: Korisnik =new Korisnik("", "", "","","","","","","","","",0,0,0,"",0);
  vrstamenija: string="";
  
  restorani: Restoran[]=[];
  konobari: Korisnik[]=[];
  rezervacije: Rezervacija[]=[];

 pi: string=""; pt: string=""; pa: string="";
  nacinsortiranja: string="";
  
  aktuelnerezervacije: Rezervacija[]=[];
  neaktuelenerezervacije: Rezervacija[]=[];
  brak: number=0;
  brneak: number=0;

  pokazi: boolean=false;
  komentar: string="";
  kljuc: string="";
  rezervzaocenjivanje: Rezervacija=new Rezervacija(0,0,"",0,0,"","","","",0,"","",0,0);
 
  imageData: any;

  dostave: Dostava[]=[];
  arhivadostava: Dostava[]=[]
  aktuelnedostave: Dostava[]=[];
    constructor(private dostavaservis: DostavaService,private router: Router,private imageservis: ImageService,private elementRef: ElementRef,private rservis: RezervacijaService,private kservis: KorisnikService,private restoran_servis: RestoranService){this.ngOnInit();}



  ngOnInit(): void {
 this.brak=0; this.brneak=0;

    let x=localStorage.getItem("ulogovangost");
    if(x!=null) {
       this.ulogovan_gost=JSON.parse(x);
    }
    this.restoran_servis.dohvsverestorane().subscribe(
      (data: Restoran[])=>{
        this.restorani=data;
      }
    );
    this.kservis.dohvatiSveKonobare().subscribe(
      (data: Korisnik[])=>{
        this.konobari=data;
      }
    );
    this.rservis.dohvatiSveRezervacije().subscribe(
      (data: Rezervacija[])=>{
        this.rezervacije=data;
        
      }
    );
    
    
  }
  
  doshr() {
   
    this.dostavaservis.dohvatiDostaveGosta(this.ulogovan_gost.korisnicko_ime).subscribe(
      (data: Dostava[])=>{
        this.dostave=data;
        this.dostave.sort((a,b)=>{
          if(( new Date(a.datumdostave).getTime()-new Date(b.datumdostave).getTime())>=0) return -1;
          else {
           return 1;
          }
         });
         this.odrediaktuelnedostave();
         this.vrstamenija="Dostava hrane";
        }
    )
  }
  odrediaktuelnedostave() {
    var cnt1: number=0; var cnt2: number=0;
    for(var i=0; i<this.dostave.length; i++) {
      if(this.dostave[i].status==="neobradjeno" || ( new Date((this.dostave[i].datumdostave)).getTime()-new Date().getTime())>0) {
               this.aktuelnedostave[cnt1]=this.dostave[i]; cnt1++;
      }
      else {
        this.arhivadostava[cnt2]=this.dostave[i];cnt2++;
      }
    }

  }

  showImage() {
    
    

    this.imageservis.getImageByKey(this.kljuc).subscribe(
      (data: any) => {
        this.createImageFromBlob(data);
      },
      error => {
        alert("doslo je do greske")
        // Dodaj logiku za obaveštenje korisnika o neuspešnom dohvatanju slike
      }
    );
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageData = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  proveri(rez: Rezervacija) {
    if(rez.prisustvovao==0 || rez.ocena!=0) return true;
    return false;
  }
 splituj(s: string) {
    var pomocna: string[]=s.split('T');
    return pomocna[0]+" "+pomocna[1];
 }

  aktuelna(rez: Rezervacija) {

    return (new Date().getTime()<new Date(rez.datum).getTime());
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


  pretrazi() {
  
    if(this.pi!="") {this.restorani=this.restorani.filter(x=>x.naziv_restorana==this.pi);}
    if(this.pt!="") {this.restorani=this.restorani.filter(x=>x.tip_restorana==this.pt);}
    if(this.pa!="") {this.restorani=this.restorani.filter(x=>x.adresa_restorana==this.pa);}
  }
 
  //Funkcija koja dohvata prosecnu ocenu restorana 
  foo(res: Restoran) {
     var sum=0; var brOcena=0;

     for(var i=0; i<this.rezervacije.length; i++) {
                if(this.rezervacije[i].id_res==res.id_restorana && this.rezervacije[i].ocena!=0) {
                  sum=sum+=this.rezervacije[i].ocena; brOcena++;
                }
     }

     if(brOcena==0) return 0;
     else {

      return Math.round(sum*1.0*100/brOcena)/100;
     }

  }
  

  proveriDaLiKonobarRadiUrestoranu(res: Restoran, kon: Korisnik) {
    if(res.id_restorana===kon.id_restorana) return true;
    return false;
  } 

  prikazirestoran(res: Restoran){
    localStorage.setItem('odabranirestoran', JSON.stringify(res));
  }


  pocetna() {
          this.router.navigate(['']);
  }

  promenilozinku(){
  
    this.router.navigate(["promenalozinke"]);
  }

  izlogujse() {
    localStorage.removeItem("ulogovangost");
    this.router.navigate(['']);
  }

  azurirajpodatke() {
    localStorage.setItem("koseazurira", JSON.stringify(this.ulogovan_gost));
    localStorage.setItem("koazurira", JSON.stringify(new Tip("gost")));
    this.router.navigate(['azuriranjepodataka'])
  }

  fooRound(x: Restoran) {
    return Math.round(this.foo(x));
  }

  pro() {
    if(this.ulogovan_gost.profilna_slika==0) {this.kljuc="defaultimage";}
    else {this.kljuc=this.ulogovan_gost.korisnicko_ime;}
    this.showImage();
    this.vrstamenija="Profil";
  }
  res() {
    this.vrstamenija="Restorani";
  }
  rez(){
    this.brak=0;this.brneak=0;
    for(var i=0; i<this.rezervacije.length; i++) {
      if(this.rezervacije[i].id_gost!=this.ulogovan_gost.korisnicko_ime) continue;
      if(this.aktuelna(this.rezervacije[i]) ) {this.aktuelnerezervacije[this.brak]=this.rezervacije[i]; this.brak++;}
      else {
        this.neaktuelenerezervacije[this.brneak]=this.rezervacije[i]; this.brneak++;
      }
    }
    this.neaktuelenerezervacije.sort((a,b)=>{
     if((new Date(a.datum).getTime()-new Date(b.datum).getTime())>0) return -1;
     else {
      return 1;
     }
    });
    this.aktuelnerezervacije.sort((a,b)=>{
      if((new Date(a.datum).getTime()-new Date(b.datum).getTime())>0) return -1;
      else {
       return 1;
      }
     });
  

    
    this.vrstamenija="Rezervacije";

  }
  mozedaoceni(x: Rezervacija) {
  if(x.ocena!=0) return true;
    if(x.prisustvovao==1) return false;
    else return true;
  }
  


  selectedStars: number = 0;
  highlightedStars: number = 0;
  numerickaocena: number=0;

  rateStar(stars: number) {
    this.selectedStars = stars;
    this.numerickaocena=stars;
    // Ovde možete dodati logiku za čuvanje ocene u polju klase ili slanje na server
  }

  highlightStars(stars: number) {
    this.highlightedStars = stars;
  }

  resetStars() {
    this.highlightedStars = 0;
  }

  starClass(starNumber: number) {
    if (starNumber <= this.selectedStars) {
      return 'star-filled';
    } else if (starNumber <= this.highlightedStars) {
      return 'star-highlighted';
    } else {
      return 'star-empty';
    }
  }

  pokaziFormu(rez: Rezervacija) {
    this.rezervzaocenjivanje=rez;
    this.pokazi=true;
    const element = this.elementRef.nativeElement.querySelector('#' + "nesto");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

  oceni() {

    this.rezervzaocenjivanje.ocena=this.numerickaocena;
    this.rezervzaocenjivanje.komentar=this.komentar;
    this.rservis.oceniRezervaciju(this.rezervzaocenjivanje).subscribe(
      (data: boolean)=>{
        if(data==true) {
          alert("Uspesno ste ocenili rezervaciju!");
          this.pokazi=false;
          this.ngOnInit();
        }
      }
    )

  }

  mozedaotkaze(rez: Rezervacija) {
   if(rez.status=="otkazana") return true;
    if((new Date(rez.datum).getTime()-new Date().getTime())<45*60*1000) return true;
    return false;
  }
  otkazirez(rez: Rezervacija) {
    this.rservis.otkaziRezervaciju(rez.id_rez).subscribe(
      (data: boolean)=>{
        if(data==true) { this.ngOnInit(); alert("Uspesno ste otkazali rezervaciju!"); }
      }
    )
  }

  dohvatiimerestorana(idres: number) {
    for(var i=0; i<this.restorani.length; i++) {
      if(this.restorani[i].id_restorana==idres) return this.restorani[i].naziv_restorana;
    }
    return "";
  }

  dohvatiadresurestorana(idres: number) {
    for(var i=0; i<this.restorani.length; i++) {
      if(this.restorani[i].id_restorana==idres) return this.restorani[i].adresa_restorana;
    }
    return "";
  }

}
