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
    private studentMaticnaSnimiEndpoint: StudentMaticnaSnimiEndpoint
  ) {}
  studentId: number;
  upisNoviSemseter: StudentMaticnaSnimiRequest | null = null;
  studentMaticnaPodaci: StudentMaticnaGetResponse | null = null;

  ovjeriLjetni(s: any) {}

  upisLjetni(s: any) {}

  ovjeriZimski(s: any) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['id'];
    this.fetchMaticnaPodaci();
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
      zimskiSemesterOvjera: new Date(Date.now()),
      cijenaSkolarine: 1,
      evidentiraoKorsinikId:
        AutentifikacijaHelper.getLoginInfo().autentifikacijaToken
          .korisnickiNalog.id,
    };
  }
}
