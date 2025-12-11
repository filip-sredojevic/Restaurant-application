export class Rezervacija {
    id_rez: number=0;
    id_res: number=0;
    id_gost: string="";
    broj_stola: number=0;
    broj_osoba: number=0;
    datum: string="";
    status: string="";
    obradio: string="";
    nacin_rezervacije: string="";
    ocena: number=0;
    komentar: string="";
    dodatno: string="";
    prisustvovao: number=0; //Ovo polje moze da postavi konobar 
    produzena: number=0;

    constructor(idrez: number, idres: number, idgost: string, brstola: number, brosoba: number, dat: string, st: string, obr: string, nacrez: string, 
        oc: number, kom: string, dod: string, pristustv: number, _produ: number){

        this.id_res=idrez;
        this.id_res=idres;
        this.id_gost=idgost;
        this.broj_stola=brstola;
        this.broj_osoba=brosoba;
        this.datum=dat;
        this.status=st;
        this.obradio=obr;
        this.nacin_rezervacije=nacrez;
        this.ocena=oc;
        this.komentar=kom;
        this.dodatno=dod;
        this.prisustvovao=pristustv;
        this.produzena=_produ;
    }

}
