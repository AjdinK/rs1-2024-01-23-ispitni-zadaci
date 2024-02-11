import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {Router} from "@angular/router";
import {StudentSnimiEndpoint, StudentSnimiRequest} from "../Endpoints/student-snimi-endpoint";
import {OpstinaGetAllEndpoint} from "../Endpoints/opstina-get-all-endpoint";
import {AutentifikacijaHelper} from "../_helpers/autentifikacija-helper";
import {StudentBrisiEndpoint} from "../Endpoints/student-brisi-endpoint";
declare function porukaSuccess(a: string):any;
declare function porukaError(a: string):any;

@Component({
  selector: 'app-studenti',
  templateUrl: './studenti.component.html',
  styleUrls: ['./studenti.component.css']
})
export class StudentiComponent implements OnInit {

  title:string = 'angularFIT2';
  ime_prezime:string = '';
  opstina: string = '';
  studentPodaci: any;
  filter_ime_prezime: boolean;
  filter_opstina: boolean;

  public titleModal :string;
  public odabraniStudent : StudentSnimiRequest | null = null;
  public opstinePodaci : any;



  constructor(private httpKlijent: HttpClient,
              private router: Router,
              private studentSnimiEndpoint : StudentSnimiEndpoint,
              private opstinaGetAllEndpoint : OpstinaGetAllEndpoint,
              private studentBrisiEndpoint : StudentBrisiEndpoint,
  ) {
  }

  testirajWebApi() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Student/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.studentPodaci = x;
    });
  }

  ngOnInit(): void {
    this.testirajWebApi();
    this.fetchOpstine();
  }

  filter() {
    if (this.studentPodaci ==null)
      return [];

    return this.studentPodaci.filter ((x:any) =>
      ((!this.filter_ime_prezime)||
      (x.ime + " " + x.prezime).startsWith(this.ime_prezime) ||
      (x.prezime + " " + x.ime).startsWith(this.ime_prezime))
      &&
      ((!this.filter_opstina) ||
      (x.opstina_rodjenja.description).startsWith(this.opstina))
    );
  }


  brisi(s: any) {
    this.studentBrisiEndpoint.obradi(s.id).subscribe({
      next:x=> {
        this.testirajWebApi();
        porukaSuccess("uspjesno ...")
      },
      error:x=> {
        porukaError("greska " + x.error)
      }
    })
  }

  odaberi(s: any) {
    this.titleModal = "Edit";
    this.odabraniStudent = {
      id:s.id,
      ime:s.ime,
      prezime:s.prezime,
      opstinaID:AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.defaultOpstinaID
    }
  }

  otvoriMaticna(s: any) {
    this.router.navigate(["/student-maticnaknjiga",s.id])
  }

  noviStudent() {
    this.titleModal = "Novi"
    this.odabraniStudent = {
      id:0,
      ime:this.ime_prezime,
      prezime:"",
      opstinaID:AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.defaultOpstinaID,
    }
  }
  zatvori () {
    this.odabraniStudent = null;
  }

  snimi() {
    this.studentSnimiEndpoint.obradi(this.odabraniStudent!).subscribe({
      next:x=> {
        this.testirajWebApi();
        this.zatvori();
        porukaSuccess("uspjesno ...")
      },
      error:x=> {
        porukaError("greska " + x.error)
      }
    })

  }

  private fetchOpstine() {
    this.opstinaGetAllEndpoint.obradi().subscribe({
      next:x=> {
        this.opstinePodaci = x;
      },
      error:x=> {
        porukaError("greska " + x.error)
      }
    })
  }
}

