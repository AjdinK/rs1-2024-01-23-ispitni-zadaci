import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";
import {StudentMaticnaGetEndpoint} from "../Endpoints/student-maticna-get-endpoint";
import {StudentMaticnaSnimiEndpoint, StudentMaticnaSnimiRequest} from "../Endpoints/student-maticna-snimi-endpoint";
import {AkademskaGodinaGetEndpoint} from "../Endpoints/akademska-godina-get-endpoint";
import {StudentMaticnaOvjeriEndpoint, StudentMaticnaOvjeriRequest} from "../Endpoints/student-maticna-ovjeri-endpoint";

declare function porukaSuccess(a: string):any;
declare function porukaError(a: string):any;

@Component({
  selector: 'app-student-maticnaknjiga',
  templateUrl: './student-maticnaknjiga.component.html',
  styleUrls: ['./student-maticnaknjiga.component.css']
})
export class StudentMaticnaknjigaComponent implements OnInit {

  studentId : number;
  public noviSemester : StudentMaticnaSnimiRequest | null = null;
  podaciMaticna:any;
  podaciAkademska: any;
  public ovjeriSemester : StudentMaticnaOvjeriRequest | null = null;
  public titleModal :string ="";


  constructor(private httpKlijent: HttpClient,
              private route: ActivatedRoute,
              private studentMaticnaGetEndpoint : StudentMaticnaGetEndpoint,
              private studentMaticnaSnimiEndpoint : StudentMaticnaSnimiEndpoint,
              private akademskaGodinaGetEndpoint  : AkademskaGodinaGetEndpoint,
              private studentMaticnaOvjeriEndpoint : StudentMaticnaOvjeriEndpoint,
  ) {
  }


  ovjeriLjetni(s: any) {

  }

  upisLjetni(s: any) {

  }

  ovjeriZimski(x:any) {
    this.titleModal = this.podaciMaticna.studentIme;
    this.ovjeriSemester = {
      id:x.id,
      zimskiSemsterOvjera: new Date (Date.now()),
      napomena:"",
    }
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params["id"];
    this.fetchPodaciMaticna();
    this.fetchPodaciAkademsla();
  }

  zatvori (){
    this.noviSemester = null;
    this.ovjeriSemester = null;
  }

  upisNoviSemster() {
    this.titleModal = this.podaciMaticna.studentIme;
      this.noviSemester = {
        id:this.studentId,
        godinaStudija:1,
        cijenaSkolarine:1000,
        zimskiSemsterUpis: new Date(Date.now()),
        akademskaGodinaID:1,
        evidentiraoKorsinikID:13,
        obnova:false,
    }
  }

  private fetchPodaciMaticna() {
    this.studentMaticnaGetEndpoint.obradi(this.studentId!).subscribe({
      next:x=> {
        this.podaciMaticna = x;
      },
      error:x=> {
        porukaError("greska " + x.error)
      }
    })
  }

  private fetchPodaciAkademsla() {
    this.akademskaGodinaGetEndpoint.obradi().subscribe({
      next:x=> {
        this.podaciAkademska = x;
      },
      error:x=> {
        porukaError("greska " + x.error)
      }
    })
  }

  snimi() {
    this.studentMaticnaSnimiEndpoint.obradi(this.noviSemester!).subscribe({
      next:x=> {
        if (x == 0){
          this.zatvori();
          porukaError("Greska ne moze se dodati ista godina ako nije obnova");
        }
        else {
          this.zatvori();
          this.fetchPodaciMaticna();
          porukaSuccess("Uspjesno....")
        }
      },
      error:x=> {
        porukaError("greska " + x.error)
      }
    })
  }

  Ovjeri() {
    this.studentMaticnaOvjeriEndpoint.obradi(this.ovjeriSemester!).subscribe({
      next:x=> {
        this.zatvori();
        this.fetchPodaciMaticna();
        porukaSuccess("Uspjesno ..")
      },
      error: x=> {
      porukaError("Greska " + x.error)
      }
    })
  }
}
