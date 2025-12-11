export class Restoran {

    id_restorana: number=0;
    naziv_restorana: string="";
    tip_restorana: string="";
    adresa_restorana: string="";
    opis_restorana: string="";
    kontakt_osoba: string="";
    brmesta: string
    xcords: string="";
    ycords: string="";
    radno_vreme: string="";
    json: number=0;



    constructor(id_res: number, nr: string, tr: string, ar: string, or: string, ko: string, brm: string, xc: string, yc: string,
       radnovreme: string, js: number
    ){
        this.id_restorana=id_res;
        this.naziv_restorana=nr;
        this.tip_restorana=tr;
        this.adresa_restorana=ar;
        this.opis_restorana=or;
        this.kontakt_osoba=ko;
        this.brmesta=brm;
        this.xcords=xc;
        this.ycords=yc;
        this.radno_vreme=radnovreme;
        this.json=js;
    }
}



