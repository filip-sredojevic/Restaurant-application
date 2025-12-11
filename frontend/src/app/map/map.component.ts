import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PomocniService } from 'src/services/pomocni.service';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit  {

  
  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 44.80560, lng: 20.47662 },
      zoom: 8
    });
  }

}

  
   



