export class Jelo {

    id: number=0;
    id_res: number=0;
    naziv_jela: string="";
    sastojci: string="";
    cena: number=0;
    kolicina: number=0;

    constructor(i: number, ir: number, nj: string, sas: string, cen: number) {
        this.id=i; this.id_res=ir; this.naziv_jela=nj; this.sastojci=sas; this.cena=cen;
    }
}