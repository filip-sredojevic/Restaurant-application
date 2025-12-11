import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './prijava_konobara_gosta/login.component';
import { FormsModule } from '@angular/forms';
import { RegistracijaComponent } from './registracija_gosta/gosta/registracija.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaadministratoraComponent } from './prijava_administratora/prijavaadministratora.component';
import { GostComponent } from './gost/gost.component';
import { KonobarComponent } from './konobar/konobar.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { AzuriranjepodatakaComponent } from './azuriranjepodataka/azuriranjepodataka.component';
import { DodavanjekonobaraComponent } from './dodavanjekonobara/dodavanjekonobara.component';
import { DodavanjerestoranaComponent } from './dodavanjerestorana/dodavanjerestorana.component';
import { CanvasComponent } from './canvas/canvas.component';
import { PrikazrestoranaComponent } from './prikazrestorana/prikazrestorana.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistracijaComponent,
    PocetnaComponent,
    PrijavaadministratoraComponent,
    GostComponent,
    KonobarComponent,
    AdministratorComponent,
    PromenaLozinkeComponent,
    AzuriranjepodatakaComponent,
    DodavanjekonobaraComponent,
    DodavanjerestoranaComponent,
    CanvasComponent,
    PrikazrestoranaComponent,
    MapComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
