import {  Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Restoran } from 'src/models/restoran';
import { RestoranService } from 'src/services/restoran.service';

@Component({
  selector: 'app-dodavanjerestorana',
  templateUrl: './dodavanjerestorana.component.html',
  styleUrls: ['./dodavanjerestorana.component.css']
})
export class DodavanjerestoranaComponent  {
  @ViewChild('myCanvas', {static: true}) canvasRef!: ElementRef;
  naziv: string="";
  tip: string="";
  adresa: string="";
  opis: string="";
  kontakt_osoba: string="";
 
  korcanvas: boolean=false;
  radnovreme: string="";
  
  bm1: number=0; bm2: number=0; bm3: number=0; bm4: number=0; bm5: number=0; bm6: number=0;


  korjson: boolean=false;

  idrestorana: number=0;
  message: string="";
  helper: number=0;

  brojpoststolova: number=0;
  xcords: number[]=[];
  ycords: number[]=[];
  constructor(private servis_restoran: RestoranService, private router: Router){}
 
   brosobzastol: number[]=[];

  dodajrestoran() {
    if(this.naziv==""){
      this.message="Unesite naziv restorana!";
    }
    else if(this.tip=="") {
      this.message="Unisite tip restorana!";
    }
    else if(this.tip==""){
      this.message="Unesite adresu restorana!";
    }
    else if(this.opis==""){
      this.message="Unesite opis restorana!";

    }
    else if(this.kontakt_osoba=="") {
      this.message="Unesite korisnicko ime kontakt osobe!";
    }
    else if(this.radnovreme==""){
      this.message="Unesite radno vreme restorana";
    }
    else if(this.brojpoststolova<6 && this.korjson==false) {
      this.message="Niste postavili sve stolove!";
    }

    else {
    
     // this.idrestorana=this.servis_restoran.dohvatiIdRestorana();
     var js: number=0;
     var brmestazastolovima: string;
     var xc: string; var yc: string;
     
      if(this.korjson==true) {js=1;  xc="JSON"; yc="JSON"; brmestazastolovima="JSON"}
      else {
        js=0; 
        xc=this.xcords[0].toString()+","+this.xcords[1].toString()+","+this.xcords[2].toString()+","+this.xcords[3].toString()+","+this.xcords[4].toString()+","+this.xcords[5].toString();
        yc=this.ycords[0].toString()+","+this.ycords[1].toString()+","+this.ycords[2].toString()+","+this.ycords[3].toString()+","+this.ycords[4].toString()+","+this.ycords[5].toString();
        brmestazastolovima=this.bm1.toString()+","+this.bm2.toString()+","+this.bm3.toString()+","+this.bm4.toString()+","+this.bm5.toString()+","+this.bm6.toString();
        
      }
      
      this.servis_restoran.dodajrestoran(new Restoran(0, this.naziv, this.tip, this.adresa, this.opis,this.kontakt_osoba, brmestazastolovima,xc, yc,this.radnovreme,js)).subscribe(
        (data: boolean)=>{
          if(data==true) {
            this.helper=1;
            this.message="Restoran je uspesno dodat u sistem!";
          }
        }
      )
    }
  }

 

  handleCanvasClick(event: MouseEvent): void {
    if(this.brojpoststolova==6) {
      alert("Postavili ste sve stolove");
      return;
    }
    this.brosobzastol=[this.bm1,this.bm2,this.bm3,this.bm4,this.bm5,this.bm6];
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    if(mouseX-50<0 || mouseX+50>500 || mouseY-50<0 || mouseY+50>400 ) {alert("Nedozvoljena pozicija"); return;}
    for(var i=0; i<this.brojpoststolova; i++) {
      if(Math.sqrt(Math.pow(this.xcords[i]-mouseX,2)+Math.pow(this.ycords[i]-mouseY,2))<=100) { alert("Stolovi ne smeju da se preklapaju"); return;}
    }
      this.xcords[this.brojpoststolova]=parseFloat(mouseX.toFixed(3));
      this.ycords[this.brojpoststolova]=parseFloat(mouseY.toFixed(4));
      this.brojpoststolova++;
      this.draw();
      
    
  }
  draw() {
    const canvas: HTMLCanvasElement= this.canvasRef.nativeElement;
    const context=canvas.getContext('2d');
    if(context) {
    for(var i=0; i<this.brojpoststolova; i++) {

      context.beginPath();
      context.arc(this.xcords[i], this.ycords[i], 50, 0, Math.PI * 2);
      context!.strokeStyle = 'black'; // Crna boja ivica
      context!.lineWidth = 2; // Debljina ivica
      context!.stroke(); // Iscrtavamo ivice 

      context!.fillStyle = 'black';
      context!.font = 'bold 24px Arial';
      context!.textAlign = 'center';
      context!.textBaseline = 'middle';
      context!.fillText(this.brosobzastol[i].toString(), this.xcords[i],this.ycords[i]);

    }

  
  

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

}
}
  nazad() {

    this.router.navigate(['administrator']);

  }
  pocetna(){
    this.router.navigate(['']);
  }

  cb1() {
    if(this.korcanvas==true) this.korcanvas=false;
  }
  cb2() {
    if(this.korjson==true) this.korjson=false;
  }
}
