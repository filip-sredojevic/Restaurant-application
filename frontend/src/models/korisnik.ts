export class Korisnik {

    korisnicko_ime: string="";
    lozinka: string="";
    bezbedonosno_pitanje="";   
    bezbedonosni_odgovor="";
    ime: string="";
    prezime: string="";
    pol: string="";             
    adresa: string="";
    telefon: string="";
    mejl: string="";
    broj_kkartice: string="";
    profilna_slika: number=0;
    id_restorana: number=0;
    brojnepojavljivanja: number=0;
    tip: string="";
    blokiran: number=0;
  


    constructor(ki: string, l: string, bp: string, bo: string, ime: string, pre: string, pol: string, adr: string, tel: string, mejl: string, 
        broj_kk: string, profilna_slika: number, idres: number, bnp: number, tip: string, blok: number){

            this.korisnicko_ime=ki;
            this.lozinka=l;
            this.bezbedonosno_pitanje=bp;
            this.bezbedonosni_odgovor=bo;
            this.ime=ime;
            this.prezime=pre;
            this.pol=pol;
            this.adresa=adr;
            this.telefon=tel;
            this.mejl=mejl;
            this.broj_kkartice=broj_kk;
            this.profilna_slika=profilna_slika;
            this.id_restorana=idres;
            this.brojnepojavljivanja=bnp;
            this.tip=tip;
            this.blokiran=blok;
            
        }
    

}

