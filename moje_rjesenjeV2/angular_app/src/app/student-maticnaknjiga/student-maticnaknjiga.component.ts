import { StudentMaticnaOvjeriRequest } from './../Endpoints/student-endpoints/student-maticna-ovjeri-endpoint';
import { StudentMaticnaGetResponse } from './../Endpoints/student-endpoints/student-maticna-get-endpoint';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MojConfig } from '../moj-config';
import { HttpClient } from '@angular/common/http';
import { StudentMaticnaGetEndpoint } from '../Endpoints/student-endpoints/student-maticna-get-endpoint';
import {
  StudentMaticnaSnimiEndpoint,
  StudentMaticnaSnimiRequest,
} from '../Endpoints/student-endpoints/student-maticna-snimi-endpoint';
import { AutentifikacijaHelper } from '../_helpers/autentifikacija-helper';
import { AkademskaGodinaGetAllEndpoint } from '../Endpoints/akademska-godina-get-all-endpoint';
import { StudentMaticnaOvjeriEndpoint } from '../Endpoints/student-endpoints/student-maticna-ovjeri-endpoint';

declare function porukaSuccess(a: string): any;
declare function porukaError(a: string): any;

@Component({
  selector: 'app-student-maticnaknjiga',
  templateUrl: './student-maticnaknjiga.component.html',
  styleUrls: ['./student-maticnaknjiga.component.css'],
})
export class StudentMaticnaknjigaComponent implements OnInit {
  constructor(
    private httpKlijent: HttpClient,
    private route: ActivatedRoute,
    private studentMaticnaGetEndpoint: StudentMaticnaGetEndpoint,
    private studentMaticnaSnimiEndpoint: StudentMaticnaSnimiEndpoint,
    private akademskaGodinaGetAllEndpoint: AkademskaGodinaGetAllEndpoint,
    private studentMaticnaOvjeriEndpoint: StudentMaticnaOvjeriEndpoint
  ) {}
  studentId: number;
  akademskaGodinaPodaci: any = null;
  upisNoviSemseter: StudentMaticnaSnimiRequest | null = null;
  studentMaticnaPodaci: StudentMaticnaGetResponse | null = null;
  novaOvjera: StudentMaticnaOvjeriRequest | null = null;

  ovjeriZimski(s: any) {
    this.novaOvjera = {
      id: s.id,
      zimskiSemesterOvjera: new Date(Date.now()),
      napomena: '',
    };
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['id'];
    this.fetchMaticnaPodaci();
    this.fetchAkademskaGodina();
  }
  fetchAkademskaGodina() {
    this.akademskaGodinaGetAllEndpoint.obradi().subscribe({
      next: (x) => {
        this.akademskaGodinaPodaci = x;
        porukaSuccess('Uspjesno akademskaGodinaGetAllEndpoint....');
      },
      error: (x) => {
        porukaError('Error akademskaGodinaGetAllEndpoint + ' + x.error);
      },
    });
  }

  fetchMaticnaPodaci() {
    this.studentMaticnaGetEndpoint.obradi(this.studentId).subscribe({
      next: (x) => {
        this.studentMaticnaPodaci = x;
        porukaSuccess('Uspjesno studentMaticnaGetEndpoint....');
      },
      error: (x) => {
        porukaError('Error studentMaticnaGetEndpoint + ' + x.error);
      },
    });
  }

  noviUpis() {
    this.upisNoviSemseter = {
      id: this.studentId,
      akademskaGodinaId: 1,
      godinaStudija: 1,
      obnova: false,
      zimskiSemesterUpis: new Date(Date.now()),
      cijenaSkolarine: 1,
      evidentiraoKorsinikId:
        AutentifikacijaHelper.getLoginInfo().autentifikacijaToken
          .korisnickiNalog.id,
    };
  }

  zatvori() {
    this.upisNoviSemseter = null;
    this.novaOvjera = null;
  }
  snimi() {
    this.studentMaticnaSnimiEndpoint.obradi(this.upisNoviSemseter!).subscribe({
      next: (x) => {
        if (x != 0) {
          porukaSuccess('Uspjesno studentMaticnaSnimiEndpoint....');
          this.fetchMaticnaPodaci();
          this.zatvori();
        } else {
          this.zatvori();
          porukaError('Ne mozete dodati istu godinu ako nije obnova');
        }
      },
      error: (x) => {
        porukaError('Error studentMaticnaSnimiEndpoint + ' + x.error);
      },
    });
  }
  snimiOvjeru() {
    this.studentMaticnaOvjeriEndpoint.obradi(this.novaOvjera!).subscribe({
      next: (x) => {
        this.zatvori();
        this.fetchMaticnaPodaci();
        porukaSuccess('Uspjesno studentMaticnaOvjeriEndpoint....');
      },
      error: (x) => {
        porukaError('Error studentMaticnaOvjeriEndpoint + ' + x.error);
      },
    });
  }
}
