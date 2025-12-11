import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestoranJson } from 'src/models/RestoranJson';
import { Korisnik } from 'src/models/korisnik';
import { Restoran } from 'src/models/restoran';
//import { RestoranWrapper } from 'src/models/restoranwrapper';
import { Rezervacija } from 'src/models/rezervacija';
import { LoadjsonService } from 'src/services/loadjson.service';
import { RestoranService } from 'src/services/restoran.service';
import { RezervacijaService } from 'src/services/rezervacija.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('myCanvas', {static: true}) canvasRef!: ElementRef;
  context!: CanvasRenderingContext2D;
  message: string="";
  datum: string="";
  vreme: string="";
  konacnovreme: string="";
  pokazicanvas: boolean=false;
  //rw: RestoranWrapper=new RestoranWrapper(0, ['rezervisan','aktivan','slobodan'],[0,0],"");
  datumzahteva: Date=new Date();
  rezervacije: Rezervacija[]=[];

  restoran: Restoran=new Restoran(0,"","","","","","","","","",0);
  korisnik: Korisnik=new Korisnik("", "", "","","","","","","","","",0,0,0,"",0);
  canvas: any;
  boje: string[]=["white","white","white"];
  text: string[]=[];
  zelena: boolean=false;
  brojosobazastolovima: number[]=[];
  izbaci: boolean=false;
  brosoba: number=0;
  jegost: boolean=false;
  unesibrosoba: boolean=false;
  brojodabranogstola: number=-1;
  hel: string="gost"; p: string="P"
  odabranarezervacija: Rezervacija=new Rezervacija(0,0,"",0,0,"","","","",0,"","",0,0);

  jsondata: RestoranJson=new RestoranJson();
  xcords: number[]=[];
  ycords: number[]=[];

  radvreres: string[]=[];
  constructor(private lj: LoadjsonService, private rezservis: RezervacijaService,private router: Router, private  restoranservis: RestoranService){}
  
  ngOnInit() {
    
    this.brojodabranogstola=-1;
    let y=localStorage.getItem("gledacanvas");
    if(y!=null) {
      this.korisnik=JSON.parse(y);
    }
    if(this.korisnik.tip==="gost") {
      this.jegost=true;
    }
    let x=localStorage.getItem('odabranirestoran');
    if(x!=null) {
      this.restoran=JSON.parse(x);
      this.radvreres=this.restoran.radno_vreme.split(";");
      
      
     
    }
    if(this.restoran.json==0) {
         this.lj.loadJsonData().subscribe((data)=>{this.jsondata=data;
          var xcor: string[]=this.restoran.xcords.split(','); 
          var ycor: string[]=this.restoran.ycords.split(','); 

          var stolovimesta: string[]=this.restoran.brmesta.split(',');
          for(var i=0; i<6; i++) {
             this.brojosobazastolovima[i]=parseInt(stolovimesta[i]);
            this.xcords[i]=parseInt(xcor[i]);
            this.ycords[i]=parseInt(ycor[i]);

          }
         });
        }
    else {
      this.lj.loadJsonData().subscribe((data)=>{this.jsondata=data; 
        
         for(var i=0; i<6; i++){
          this.xcords[i]=this.jsondata.stolovi[i].x;
          this.ycords[i]=this.jsondata.stolovi[i].y;
          this.brojosobazastolovima[i]=this.jsondata.stolovi[i].brojmesta;
         } 
    
      })
    }

    
  
  if(this.korisnik.tip=="konobar") {
    this.jegost=false;
    let x1=localStorage.getItem('aktuelnarezervacija');
    if(x1!=null) {
      this.odabranarezervacija=JSON.parse(x1);
    }
    this.restoranservis.dohvatiRestoran(this.odabranarezervacija.id_res).subscribe((data: Restoran)=>{this.restoran=data; localStorage.setItem("odabranirestoran", JSON.stringify(this.restoran))});

  }
    let z=localStorage.getItem('konvreme');
    if(z!=null) {
      this.konacnovreme=JSON.parse(z);
    }
    
    if(this.korisnik.tip=="konobar" && this.odabranarezervacija.nacin_rezervacije=="P") {
      const canvas: HTMLCanvasElement= this.canvasRef.nativeElement;
      const context=canvas.getContext('2d');
      canvas.style.pointerEvents='none';
    }
  this.rezservis.dohvatiSveRezervacije().subscribe((data:Rezervacija[])=>{
    this.rezervacije=data;
    for(var j=0; j<6; j++) {
      var  odredio: boolean=false;
    for(var i=0; i<this.rezervacije.length; i++) {                                                       //Novoooo
      if(this.rezervacije[i].id_res!=this.restoran.id_restorana || this.rezervacije[i].broj_stola!=j || (this.rezervacije[i].broj_stola==j && this.rezervacije[i].nacin_rezervacije=="F" && this.rezervacije[i].status=="na cekanju")) continue;
      if(this.rezervacije[i].status==="rezervisan"  &&   Math.abs(new Date(this.rezervacije[i].datum).getTime()-new Date(this.konacnovreme).getTime())<(3+this.rezervacije[i].produzena)*3600*1000){
       this.boje[j]="red"; odredio=true; this.text[j]=""; break;
        
      }
      if(this.rezervacije[i].status==="na cekanju"  &&   Math.abs(new Date(this.rezervacije[i].datum).getTime()-new Date(this.konacnovreme).getTime())<(3+this.rezervacije[i].produzena)*3600*1000){
        this.boje[j]="yellow"; odredio=true; this.text[j]="";break;
      }
    }
    if(odredio==false) {
      this.boje[j]="white";
      this.text[j]=this.brojosobazastolovima[j].toString();
    } 

    }
    
    
  });
//  this.message="";
  localStorage.setItem("boje",JSON.stringify(this.boje));

 this.draw(); 
    

  }

  radiRestoran() {

    var vremerezervacije: string=this.konacnovreme;
    var praznomesto: boolean=true;

    //Provera da li restoran radi u zadato vreme
    var dan: number=new Date(vremerezervacije).getDay();  //redni broj dana u sedmici 
    var rv: string[]=this.radvreres[dan].split(",");
  
    console.log("dan",dan);
    console.log("rv", rv);
    var sat: number=new Date(vremerezervacije).getHours();

    for(var i=0; i<3; i++) {
      
        var radi: boolean=false;
       for(var j=0;j<rv.length; j++) {
        var x: string[]=rv[j].split(":");
        var p: number=parseInt(x[0]); var k: number=parseInt(x[1]);
        if( (sat+i)%24>=p && (sat+i)%24<=k) {radi=true; break;}
       }
       if(radi==false) {
         return false;;
       } 
    }

    return true;
  }

  prihvati() {
    this.odabranarezervacija.obradio=this.korisnik.korisnicko_ime;
   this.rezservis.prihvatiRezervaciju(this.odabranarezervacija).subscribe(
    (data: boolean)=>{
      if(data==true)   {this.zelena=true; this.message="Zahtev je uspesno prihvacen!";this.ngOnInit();}
    }
   )
  }
  odbij() {
    this.odabranarezervacija.obradio=this.korisnik.korisnicko_ime;
    this.rezservis.odbijRezervaciju(this.odabranarezervacija).subscribe(
      (data: boolean)=>{
        if(data==true) {this.zelena=true; this.message="Zahtev je uspesno odbijen!";this.ngOnInit(); }
      }
    )
  }
 
  crtaj() {
    
    
    if(this.korisnik.tip==="gost")this.konacnovreme=this.datum+"T"+this.vreme+":00";
    if(this.korisnik.tip==="gost" && !this.radiRestoran()) {
      alert("Restoran ne radi u zadato vreme"); return;
    }
    localStorage.setItem("konvreme", JSON.stringify(this.konacnovreme));
    this.ngOnInit();
   
    
  }

  obrada(i: number) {


   
    
    if(this.boje[i]=="red" || this.boje[i]=="orange") return;
    if(this.brojosobazastolovima[i]<this.brosoba && this.korisnik.tip==="korisnik") {alert("Nema dovoljno mesta za datim stolom!"); return;}
    if(this.brojosobazastolovima[i]<this.odabranarezervacija.broj_osoba && this.korisnik.tip==="konobar") {alert("Nema dovoljno mesta za datim stolom!"); return;}
    if(this.korisnik.tip==="konobar") {
     var idrezervacije: number=this.odabranarezervacija.id_rez;
     localStorage.setItem("provera", JSON.stringify(new Rezervacija(idrezervacije, this.restoran.id_restorana,"",i,0,"","",this.korisnik.korisnicko_ime,"",0,"","",0,0)));
     var t=confirm(`Da li ste sigurni da zelite da potvrdite rezervaciju za stolom ${i}?`);
     if(t==false) {return;}
      else {
        this.odabranarezervacija.obradio=this.korisnik.korisnicko_ime;
        this.odabranarezervacija.broj_stola=i;

     this.rezservis.prihvatiRezervacijuSaStolom(this.odabranarezervacija).subscribe(
        (data: boolean)=>{if(data==true){this.text[i]=""; this.boje[i]="red"; this.draw();} }
        );
        
      
    }
    }
    else {
    for(var j=0; j<6;j++) if(this.boje[j]=='green') {this.boje[j]="white";}
    if(this.boje[i]=="white") {
       this.brojodabranogstola=i; this.boje[i]="green"; this.unesibrosoba=true; this.draw();
    }
  }
  }
  rezervisi(){
    if(this.brosoba>this.brojosobazastolovima[this.brojodabranogstola]) {
      this.boje[this.brojodabranogstola]="white";
      this.message="Za datim stolom nema dovoljno mesta!";
      this.unesibrosoba=false;
      this.draw();
    }

    else {
      this.rezservis.dodajRezervaciju(new Rezervacija(0,this.restoran.id_restorana, this.korisnik.korisnicko_ime, this.brojodabranogstola, this.brosoba,this.konacnovreme,"na cekanju", "N", "P", 0, "X", "X", 0,0)).subscribe(
        (data: boolean)=>{
          this.unesibrosoba=false;
          this.boje[this.brojodabranogstola]="yellow";
          this.text[this.brojodabranogstola]="";
          this.message="Rezervacija je uspesno dodata!";
          this.unesibrosoba=false;
          this.zelena=true;
         // this.draw(); 
         this.ngOnInit();
        }
      );
      this.ngOnInit();

    }
  }

  draw(): void {
    
    const canvas: HTMLCanvasElement= this.canvasRef.nativeElement;
    const context=canvas.getContext('2d');

    //Novo - Obezbedjuje da se Toalet i Kuhinja uvek ispisuju na identicnom mestu
    context?.clearRect(0,0,canvas.width, canvas.height);

  
  const radius = 50;
  if(context) {



    const rectWidth = 100; // Širina pravougaonika
  const rectHeight = 30; // Visina pravougaonika

  //Toalet
  // Položaj pravougaonika tako da je njegov donji desni ugao u donjem desnom uglu Canvasa
  const T_rectX = 350 // 10 piksela od desne ivice Canvasa
  const T_rectY = 430; // 10 piksela od donje ivice Canvasa

  // Nacrtaj pravougaonik
  context.fillStyle = 'black'; // Boja pravougaonika
   context.strokeRect(T_rectX, T_rectY, rectWidth, rectHeight);
   

  // Nacrtaj tekst "Toalet" u pravougaoniku
   context.fillStyle = 'black'; // Boja teksta
   context.font = ' 12px Arial'; // Font teksta
  const text = 'Toalet';
  const textWidth = context.measureText(text).width;  // Širina teksta
  const textX = T_rectX + (rectWidth - textWidth) / 2; // Centriraj tekst horizontalno u pravougaoniku
  const textY = T_rectY + rectHeight / 2; // Centriraj tekst vertikalno u pravougaoniku
  context.fillText(text, textX, textY);

  //Kuhinja
  // Položaj pravougaonika tako da je njegov donji desni ugao u donjem desnom uglu Canvasa
  const K_rectX = 50; // 10 piksela od desne ivice Canvasa
  const K_rectY =430; // 10 piksela od donje ivice Canvasa

  // Nacrtaj pravougaonik
  context.fillStyle = 'black'; // Boja pravougaonika
  context.strokeRect(K_rectX, K_rectY, rectWidth, rectHeight);
   

  // Nacrtaj tekst "Kuhinja" u pravougaoniku
  context.fillStyle = 'black'; // Boja teksta
  context.font = ' 12px Arial'; // Font teksta
  const K_text = 'Kuhinja';
  const K_textWidth = context.measureText(text).width; // Širina teksta
  const K_textX = K_rectX + (rectWidth - K_textWidth) / 2 + 1; // Centriraj tekst horizontalno u pravougaoniku
  const K_textY = K_rectY + rectHeight / 2; // Centriraj tekst vertikalno u pravougaoniku
  context.fillText(K_text, K_textX, K_textY);

  for(var i=0; i<6; i++){
    //const circleX = centerX + (i - 1) * 150;
    const centerX=this.xcords[i]; const centerY=this.ycords[i];
    let ccolor = this.boje[i];
    let ttext = this.text[i];
  
   // Crtamo ivice krugova
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context!.strokeStyle = 'black'; // Crna boja ivica
  context!.lineWidth = 2; // Debljina ivica
  context!.stroke(); // Iscrtavamo ivice 

   context!.beginPath();
  context!.arc(centerX, centerY, radius, 0, Math.PI * 2);
   context!.fillStyle = ccolor;
   context!.fill();
    context!.fillStyle = 'black';
    context!.font = 'bold 24px Arial';
    context!.textAlign = 'center';
    context!.textBaseline = 'middle';
    context!.fillText(ttext, centerX, centerY);
  
  };
 
  }
 
}
  handleCanvasClick(event: MouseEvent): void {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const centerX = this.canvasRef.nativeElement.width / 2;
    const centerY = this.canvasRef.nativeElement.height / 2;
    const radius = 50;

    // Proveravamo da li je kliknuti položaj unutar kruga
    const distanceFromZeroCircle = Math.sqrt(Math.pow(mouseX - this.xcords[0], 2) + Math.pow(mouseY - this.ycords[0], 2));
    const distanceFromFirstCircle = Math.sqrt(Math.pow(mouseX - this.xcords[1], 2) + Math.pow(mouseY - this.ycords[1], 2));
    const distanceFromSecondCircle = Math.sqrt(Math.pow(mouseX - this.xcords[2], 2) + Math.pow(mouseY - this.ycords[2], 2));

    const distanceFromThirdCircle = Math.sqrt(Math.pow(mouseX - this.xcords[3], 2) + Math.pow(mouseY - this.ycords[3], 2));
    const distanceFromForthCircle = Math.sqrt(Math.pow(mouseX - this.xcords[4], 2) + Math.pow(mouseY - this.ycords[4], 2));
    const distanceFromFifthCircle = Math.sqrt(Math.pow(mouseX - this.xcords[5], 2) + Math.pow(mouseY - this.ycords[5], 2));

    

    if (distanceFromZeroCircle <= radius) {
       this.obrada(0);
    } else if (distanceFromFirstCircle <= radius) { 
    this.obrada(1);
    } else if (distanceFromSecondCircle <= radius) {
   this.obrada(2);
    } 
    else if (distanceFromThirdCircle<=radius) {
      this.obrada(3);
    }
    else if (distanceFromForthCircle<=radius) {
      this.obrada(4);
    }
    else if (distanceFromFifthCircle<=radius) {
      this.obrada(5);
    }
      else {                              
      for(var k=0; k<6; k++) {if(this.boje[k]=="green") {
        this.boje[k]="white";this.unesibrosoba=false; this.message=""; this.draw(); break;
      }}
    }
  }

  pocetna() {
    this.router.navigate(['']);
  }
}
