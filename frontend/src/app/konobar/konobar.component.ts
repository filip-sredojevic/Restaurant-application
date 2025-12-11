import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Dostava } from 'src/models/Dostava';
import { Wrapper } from 'src/models/Wrapper';
import { Wrapper1 } from 'src/models/Wrapper1';
import { Wrapper2 } from 'src/models/Wrapper2';
import { Korisnik } from 'src/models/korisnik';
import { Rezervacija } from 'src/models/rezervacija';
import { Tip } from 'src/models/tip';
import { DostavaService } from 'src/services/dostava.service';
import { ImageService } from 'src/services/image.service';
import { KorisnikService } from 'src/services/korisnik.service';
import { PomocniService } from 'src/services/pomocni.service';
import { RezervacijaService } from 'src/services/rezervacija.service';


@Component({
  selector: 'app-konobar',
  templateUrl: './konobar.component.html',
  styleUrls: ['./konobar.component.css']
})
export class KonobarComponent  implements OnInit {
  @ViewChild('barChartCanvas', {static: true}) barChartCanvas!: ElementRef;
  he: string="na cekanju"
  h1: string="Profil"; h2: string="Rezervacije"; h3: string="Dostave"; h4: string="statistika";
  ulogovan_konobar: Korisnik=new Korisnik("", "", "","","","","","","","","",0,0,0,"",0);
  vrstamenija: string="";
  kljuc: string="";
  imageData:  any;
  
  vremedostave: string="";
  rezervacije: Rezervacija[]=[];
  dostave: Dostava[]=[];
  pomocni: string[]=[];

  vremeisporuke: string="";
  vrednostibar: Wrapper[]=[];


  maksgostiju: number=0;
  konobarirestorana: Korisnik[]=[];

  

  constructor(private ks: KorisnikService,private dostavaservis: DostavaService,private router: Router,private imageservis: ImageService,private pomocniservis: PomocniService, private rs: RezervacijaService){}
  ngOnInit(): void {
    
    let x=localStorage.getItem("ulogovankonobar");
    if(x!=null) {
      this.ulogovan_konobar=JSON.parse(x);
    }
    this.rs.dohvatiSveRezervacijeRestorana(this.ulogovan_konobar.id_restorana).subscribe((data: Rezervacija[])=>{this.rezervacije=data;
      this.rezervacije.sort((a,b)=>{
        if(new Date(a.datum).getTime()>new Date(b.datum).getTime()) return -1;
        else return 1;
      })
     })
    this.ks.dohvatiKonobareRestorana(this.ulogovan_konobar.id_restorana).subscribe((data: Korisnik[])=>{this.konobarirestorana=data; localStorage.setItem("kr", JSON.stringify(this.konobarirestorana))})

  }
  potvrdidostavu(dost: Dostava) {
    this.vremeisporuke="";
    if(dost.vremedostave=="") {alert("Morate uneti procenjeno vreme dostave!"); return};
   this.pomocni=dost.vremedostave.split('-');
  
    var pocetak: number=new Date().getTime()+(parseInt(this.pomocni[0]))*60000;
    var kraj: number=new Date().getTime()+(parseInt(this.pomocni[1]))*60000;
    this.vremeisporuke += new Date(pocetak).getFullYear().toString();
    this.vremeisporuke+=":";
    if(new Date(pocetak).getMonth()<10) this.vremeisporuke+=("0"+new Date(pocetak).getMonth());
    else { this.vremeisporuke+=new Date(pocetak).getMonth()}
    this.vremeisporuke+=":";
    if(new Date(pocetak).getDate()<10) this.vremeisporuke+=("0"+new Date(pocetak).getDate());
    else { this.vremeisporuke+=new Date(pocetak).getDate()}
    this.vremeisporuke+=" ";
    if(new Date(pocetak).getHours()<10) this.vremeisporuke+=("0"+new Date(pocetak).getHours());
    else this.vremeisporuke +=new Date(pocetak).getHours();
    this.vremeisporuke+=":";
    if(new Date(pocetak).getMinutes()<10) this.vremeisporuke+= ("0"+new Date(pocetak).getMinutes());
    else {this.vremeisporuke+=new Date(pocetak).getMinutes();}
    this.vremeisporuke+="-"

    if(new Date(kraj).getHours()<10) this.vremeisporuke+=("0"+new Date(kraj).getHours());
    else this.vremeisporuke +=new Date(pocetak).getHours();
    this.vremeisporuke+=":";
    if(new Date(kraj).getMinutes()<10) this.vremeisporuke+= ("0"+new Date(kraj).getMinutes());
    else {this.vremeisporuke+=new Date(kraj).getMinutes();}

    dost.obradio=this.ulogovan_konobar.korisnicko_ime;
    dost.vreme_dostave=dost.vremedostave;
    dost.datum_dostave=this.vremeisporuke;
    dost.datumdostave=new Date(kraj).toString();
    this.dostavaservis.prihvatiDostavu(dost).subscribe((data: boolean)=>{if(data==true) alert("Dostava je uspesno prihvacena!")})


  }
  
  odbijdostavu(dost: Dostava) {

  }
  obradi(rezer: Rezervacija) {
    localStorage.setItem('konvreme', JSON.stringify(rezer.datum));
    localStorage.setItem("aktuelnarezervacija", JSON.stringify(rezer));
    localStorage.setItem("gledacanvas",JSON.stringify(this.ulogovan_konobar));
    this.router.navigate(['canvas']);

}
  parsiraj(datum: string) {
    var d: string[]=datum.split("T");
    return d[0]+" "+ d[1];
  }
  prof() {
    const canvas: HTMLCanvasElement = this.barChartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
      
    // Brišemo sve sa Canvasa
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    if(this.ulogovan_konobar.profilna_slika==0) {this.kljuc="defaultimage";}
    else {this.kljuc=this.ulogovan_konobar.korisnicko_ime;}
    this.showImage();
    this.vrstamenija="Profil"
  }
  reze() {
    const canvas: HTMLCanvasElement = this.barChartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    // Brišemo sve sa Canvasa
    ctx!.clearRect(0, 0, canvas.width, canvas.height);

    this.vrstamenija="Rezervacije"
  }
 
  dost() {
    const canvas: HTMLCanvasElement = this.barChartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
      
    // Brišemo sve sa Canvasa
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    this.dostavaservis.dohvatiDistaveRestorana(this.ulogovan_konobar.id_restorana).subscribe(
      (data: Dostava[])=>{
        this.dostave=data;
        this.vrstamenija="Dostave"
      }
    )
    
  }
  mat: Wrapper2[][] = [];
  brojaci: number[]=[];

  vrednostihist: Wrapper1[]=[];


  konres: string[]=[]
  brojobrgostiju: number[]=[];

   
  stat() {
 
    //Diagram bar
    for(var i=0; i<7;i++) {this.vrednostibar[i]=new Wrapper(); }
    
    this.vrednostibar[0].dan="pon";this.vrednostibar[1].dan="uto"; this.vrednostibar[2].dan="sre";this.vrednostibar[3].dan="cet";this.vrednostibar[4].dan="pet";this.vrednostibar[5].dan="sub"; this.vrednostibar[6].dan="ned";
    for(var i=0;i<this.rezervacije.length; i++) {
      if(this.rezervacije[i].obradio===this.ulogovan_konobar.korisnicko_ime &&   this.rezervacije[i].status=="rezervisan") {
       this.vrednostibar[new Date(this.rezervacije[i].datum).getDay()].brgostiju+=this.rezervacije[i].broj_osoba;
      }
    }
    this.maksgostiju=0;
   for(var i=0; i<7; i++) {
    if(this.vrednostibar[i].brgostiju>this.maksgostiju) this.maksgostiju=this.vrednostibar[i].brgostiju;
   }
    
  //Diagram histogram
   this.brojaci=new Array(7);
   for(var i=0; i<7; i++) this.brojaci[i]=0;
   this.mat=new Array(7).fill(0);
   this.vrednostihist=new Array(7);
   for(var i=0; i<7; i++) this.vrednostihist[i]=new Wrapper1();
   this.vrednostihist[0].dan="pon";this.vrednostihist[1].dan="uto";this.vrednostihist[2].dan="sre"; this.vrednostihist[3].dan="cet"; this.vrednostihist[4].dan="pet"; this.vrednostihist[5].dan="sub"; this.vrednostihist[6].dan="ned";  
   for(var i=0; i<7;i++) this.mat[i]=new Array(100);
   for(var j=0; j<7;j++) {
    for(var i=0; i<100; i++) {this.mat[j][i]=new Wrapper2();}


   


   }
   
   for(var i=0; i<this.rezervacije.length; i++) {
    if((this.rezervacije[i].obradio==this.ulogovan_konobar.korisnicko_ime)  && (((new Date().getTime()-new Date(this.rezervacije[i].datum).getTime()))<(24*30*24*60*60*10000))) {
        (this.vrednostihist[new Date(this.rezervacije[i].datum).getDay()]).brojRez++;
        let t1=new Wrapper2();
        t1.godina=new Date(this.rezervacije[i].datum).getFullYear();
        t1.mesec=new Date(this.rezervacije[i].datum).getMonth();
        t1.dan=new Date(this.rezervacije[i].datum).getDate();//Izmenjeno stajalo getDay()
         let exists=false; let cnt=this.brojaci[new Date(this.rezervacije[i].datum).getDay()];
         for(var j=0; j<cnt; j++) {
            let t2=this.mat[new Date(this.rezervacije[i].datum).getDay()][j];
            if(t2.godina==t1.godina && t2.dan==t1.dan && t2.mesec==t1.mesec) {
              exists=true; break;
            }
         }
         if(exists==false) {
          this.vrednostihist[new Date(this.rezervacije[i].datum).getDay()].brojRazlDana++;
          this.mat[new Date(this.rezervacije[i].datum).getDay()][cnt]=t1;
          this.brojaci[new Date(this.rezervacije[i].datum).getDay()]++;
         }
        
    }
  

  }

  localStorage.setItem('matrica', JSON.stringify(this.mat));
  localStorage.setItem("brojac", JSON.stringify(this.brojaci));
  localStorage.setItem("vrednostibar", JSON.stringify(this.vrednostibar));
  //localStorage.setItem("vrednostihis",JSON.stringify(this.vrednostihist));


   //Diagram pie
   let brkonobara=this.konobarirestorana.length;
   this.konres=new Array(brkonobara);
   for(var i=0; i<brkonobara;i++) {
     this.konres[i]=this.konobarirestorana[i].korisnicko_ime;
   }
   this.brojobrgostiju=new Array(brkonobara);
   for(var i=0; i<brkonobara; i++) this.brojobrgostiju[i]=0;
   for(var i=0; i<this.rezervacije.length; i++) {
      for(var j=0; j<brkonobara; j++) {
       if(this.konres[j]==this.rezervacije[i].obradio && this.rezervacije[i].status=="rezervisan") {
         this.brojobrgostiju[j]+=this.rezervacije[i].broj_osoba; break; 
       }
      }
   }
   localStorage.setItem("obradjenigosti", JSON.stringify(this.konres));
   localStorage.setItem("obradjenigostibroj", JSON.stringify(this.brojobrgostiju));



    this.vrstamenija="statistika";
    this.drawChartBar(); this.drawCharHisto(); this.drawPieChart();
   
      
}

drawCharHisto() {
  localStorage.setItem("vrednostihis",JSON.stringify(this.vrednostihist));
  const canvas: HTMLCanvasElement = this.barChartCanvas.nativeElement;
  const ctx = canvas.getContext('2d');
  console.log("Pocelo crtanje histograma!")
  
    const barSpacing = 20;
    let startX = 200;
    const startY = 200+600; //Centar od PIE Char + 600

    let maxHeight=250;
    let maxValue=1;
    for(var i=0; i<this.vrednostihist.length; i++) {if(this.vrednostihist[i].brojRez>maxValue) {maxValue=this.vrednostihist[i].brojRez}}
    // Crtanje dijagrama sa stupcima
    for (var i = 0; i < 7; i++) {
      console.log("crtamo");
        let barHeight = ( (this.vrednostihist[i].brojRez*1.0/this.vrednostihist[i].brojRazlDana)*1.0/maxValue) * 100;
        if(barHeight>maxHeight) barHeight=maxHeight;

       let barWidth=( (this.vrednostihist[i].brojRez*1.0/this.vrednostihist[i].brojRazlDana)*1.0/maxValue) * 50;
        ctx!.fillStyle = 'blue';
        ctx!.fillRect(startX, startY - barHeight, barWidth, barHeight);

        
        // Postavljanje fonta za etikete
        ctx!.font = '12px Arial';
        // Poboljšanje položaja etiketa
       const labelWidth = ctx!.measureText(this.vrednostihist[i].dan).width;
        ctx!.fillText(this.vrednostihist[i].dan, startX + (barWidth - labelWidth) / 2, startY + 9);

      

        ctx!.fillStyle = 'red';
        ctx!.fillText((this.vrednostihist[i].brojRez*1.0/this.vrednostihist[i].brojRazlDana).toFixed(2).toString(), startX + (barWidth / 2) - 8, startY - barHeight -1);

        startX += (barWidth +  barSpacing);
    }
    startX=10;
    ctx!.fillStyle = 'red'
    ctx!.fillText('Prosecan broj rezervacija  po danima', canvas.width/2-75, startY+30);


}
   drawChartBar(): void {
   
    const canvas: HTMLCanvasElement = this.barChartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    // Postavljanje dimenzija dijagrama
    const barWidth = 30;
    const barSpacing = 20;
    let startX = 200;
    const startY = 200+300;

    let maxHeight=250;
    const maxValue = Math.max(...this.vrednostibar.map(item => item.brgostiju));
 // const maxValue=this.maksgostiju;
    // Crtanje dijagrama sa stupcima
    for (let i = 0; i < 7; i++) {
        let barHeight = (this.vrednostibar[i].brgostiju /  maxValue) * 100;
        if(barHeight>maxHeight) barHeight=maxHeight;
        ctx!.fillStyle = 'blue';
        ctx!.fillRect(startX, startY - barHeight, barWidth, barHeight);

        // Postavljanje fonta za etikete
        ctx!.font = '12px Arial';
        
        // Poboljšanje položaja etiketa
        const labelWidth = ctx!.measureText(this.vrednostibar[i].dan).width;
        ctx!.fillText(this.vrednostibar[i].dan, startX + (barWidth - labelWidth) / 2, startY + 9);

        ctx!.fillStyle = 'red'
        ctx!.fillText(this.vrednostibar[i].brgostiju.toString(), startX + (barWidth / 2) - 8, startY - barHeight -1);

        startX += barWidth + barSpacing;
    }
    startX=10;
    ctx!.fillStyle = 'red'
    ctx!.fillText('Broj osoba po danima', canvas.width/2-75, startY+30);
  
   }
   boje: string[]=[];

   drawPieChart() {
 
    
    this.boje=new Array(this.konobarirestorana.length);
    const canvas = this.barChartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
  
    
    // Postavljanje dimenzija Canvas-a
  //  canvas.width = 400;
   // canvas.height = 400;
    
    // Postavljanje centra dijagrama
    const centerX = canvas.width / 2;
    const centerY = 200;
    //const radius = Math.min(centerX, centerY) * 0.8;
    const radius=100;
    // Računanje ukupnog zbroja vrijednosti
    const total = this.brojobrgostiju.reduce((acc, val) => acc + val, 0);
    
    // Crtanje dijagrama pite
    let startAngle = 0;
    this.brojobrgostiju.forEach((value, index) => {
        const sliceAngle = (2 * Math.PI * value) / total;
        this.boje[index]=this.getRandomColor();
        ctx.fillStyle = this.boje[index];
    
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
    
        startAngle += sliceAngle;
    });
     ctx.fillStyle="#000000";
    let txt: string="Raspodela gostiju po konobarima";
    let duzteksta: number=ctx.measureText(txt).width;
    ctx.fillText(txt, canvas.width/2-duzteksta/2, centerY+radius+10)
   
    let t=this.konobarirestorana.length;
    for (let i = 0; i < t; i++) {
      ctx.fillStyle = this.boje[i];
      ctx.fillRect(canvas.width/2+radius+10, centerY-t*40 + 30 * i, 20, 20);
      ctx.fillText(`${this.konres[i]} (${this.brojobrgostiju[i]})`, canvas.width/2+radius+35, centerY-t*40 + 30 * i+15);
  }


   }
   
   getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
   }

 

  showImage() {
    

    this.imageservis.getImageByKey(this.kljuc).subscribe(
      (data: any) => {
        this.createImageFromBlob(data);
      },
      error => {
        alert("doslo je do greske")
       
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



  azurirajpodatke() {
    localStorage.setItem("koseazurira", JSON.stringify(this.ulogovan_konobar));
    localStorage.setItem("koazurira", JSON.stringify(new Tip("gost")));
    this.router.navigate(['azuriranjepodataka'])
  }

  pocetna() {

    this.router.navigate(['']);
  }
  izlogujse() {

    localStorage.removeItem("ulogovankonobar");
    this.router.navigate(['']);
  }
  dosao(rez: Rezervacija) {
  this.rs.prijaviDolazak(rez.id_rez).subscribe(
    (data: boolean)=>{
      if(data==true) {alert("Dolazak je uspesno prijavljen");}
    }
  )

  }
  nijedosao(rez: Rezervacija) {
         
    this.pomocniservis.prijaviNeDolazak(rez).subscribe(
      (data: boolean)=>{
        if(data==true) { alert("Nedolazak je uspesno prijavljen!"); }
      }
    )
  
  }
  proslopolasata(rez: Rezervacija) {
    if(rez.obradio!=this.ulogovan_konobar.korisnicko_ime || ((new Date().getTime()-new Date(rez.datum).getTime())<3.5*3600*1000)) return  true;
    return false;
  }

  mozesdaproduzis(rez: Rezervacija) {
    if(rez.status=="odbijen") return true;
  if(rez.produzena==1 || rez.obradio!=this.ulogovan_konobar.korisnicko_ime) return true;
  return false;
  }
  produzi(rez: Rezervacija) {
    this.rs.produziRezervaciju(rez.id_rez).subscribe(
      (data:boolean)=>{
        if(data==true) { alert("Uspesno ste produzili rezervaciju!");this.ngOnInit();}
      }
    )

  }
}
