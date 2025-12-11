export class Dostava {

    id: number=0;
    id_res: number=0;
    naziv_restorana: string="";
    id_gost: string="";
    iznos: number=0;
    vreme_dostave: string="";
    status: string="";
    datum_dostave: string="";
    obradio: string=""
    adresa: string="";
    vremedostave: string=""; 

    datumdostave: string="";


  constructor(i: number, ir: number, nr: string, ig: string, iz: number, vd: string, stat: string, dd: string, obr: string, adr: string, dad: string) {
    this.id=i; this.id_res=ir; this.naziv_restorana=nr; this.id_gost=ig;this.iznos=iz;this.vreme_dostave=vd; this.status=stat; this.datum_dostave=dd; this.obradio=obr; this.adresa=adr;  this.datumdostave=dad;
  }
}