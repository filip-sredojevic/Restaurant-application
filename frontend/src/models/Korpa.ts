export class Korpa {

    id: number=0;
    id_gost: string="";
    id_res: number=0;
    naziv_jela: string="";
    sastojci: string="";
    cena: number=0;
    status: string="";
    kolicina: number=0;


    constructor(i: number, ig: string, ires: number, nj: string, sast: string, cen:  number, stat: string, kol: number) {
        this.id=i; this.id_gost=ig; this.id_res=ires;this.naziv_jela=nj;this.sastojci=sast;this.cena=cen;this.status=stat; this.kolicina=kol;
    }

}