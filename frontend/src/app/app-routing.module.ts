import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './prijava_konobara_gosta/login.component';
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
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: "", component: PocetnaComponent},
  {path: "login", component: LoginComponent},
  {path: "registracija", component: RegistracijaComponent},
  {path: "prijavaadministratora", component: PrijavaadministratoraComponent},
  {path: "gost", component:  GostComponent},
  {path: "konobar", component: KonobarComponent},
  {path: "administrator", component: AdministratorComponent},
  {path: "promenalozinke", component: PromenaLozinkeComponent},
  {path: "azuriranjepodataka", component: AzuriranjepodatakaComponent}, 
  {path: "dodavanjekonobara", component: DodavanjekonobaraComponent}, 
  {path: "dodavanjerestorana", component: DodavanjerestoranaComponent},
  {path: "prikazrestorana", component: PrikazrestoranaComponent},
  {path: "canvas", component: CanvasComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
