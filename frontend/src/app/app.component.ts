/*import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/services/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'frontend';
  formattedDate: string=""

  constructor(private datePipe: DatePipe) { }
  ngOnInit() {
    this.addMinutesAndFormat(10);
  }

  addMinutesAndFormat(minutes: number) {
    let currentDate = new Date();
    let newDate = new Date(currentDate.getTime() + minutes * 60000); // Dodajemo određeni broj minuta (minutes * 60000 milisekundi)
    let formattedDateOrNull = this.datePipe.transform(newDate, 'yyyy-MM-dd HH:mm:ss');
    this.formattedDate = formattedDateOrNull ? formattedDateOrNull : ''; // Ako je formatirani datum null, dodeli prazan string
  }
  

}

*/
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { RestoranJson } from 'src/models/RestoranJson';
import { LoadjsonService } from 'src/services/loadjson.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('myCanvas', {static: true}) canvasRef!: ElementRef;
  title = 'frontend';
  chartDrawn: boolean = false;
  hel: boolean=false;

  jsondata: RestoranJson=new RestoranJson();
  /*@ViewChild('barChartCanvas') barChartCanvas: ElementRef<HTMLCanvasElement> | undefined;*/
  
  constructor(private ls: LoadjsonService){}
  ngOnInit(): void {
  /* this.ls.loadJsonData().subscribe(
    (data)=>{
      this.jsondata=data;
      if(data!=null) {alert("Stigao dobar odgovor");}
      else {alert("Stigao los odgovor!");}
      this.draw();
    }
   )*/
    
   
  }

  draw() {

    const canvas: HTMLCanvasElement= this.canvasRef.nativeElement;
    const context=canvas.getContext('2d');

    //Novo - Obezbedjuje da se Toalet i Kuhinja uvek ispisuju na identicnom mestu
    context?.clearRect(0,0,canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 50;
  if(context) {



    const rectWidth = 50; // Širina pravougaonika
    const rectHeight = 50; // Visina pravougaonika
  
    //Toalet
    // Položaj pravougaonika tako da je njegov donji desni ugao u donjem desnom uglu Canvasa
    const T_rectX = 50; // 10 piksela od desne ivice Canvasa
    const T_rectY = 50; // 10 piksela od donje ivice Canvasa
  
    // Nacrtaj pravougaonik
    context.fillStyle = 'black'; // Boja pravougaonika
     context.strokeRect(this.jsondata.stolovi[0].x, this.jsondata.stolovi[0].y, rectWidth, rectHeight);

  }

}
}
