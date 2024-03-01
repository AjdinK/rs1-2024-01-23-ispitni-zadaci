import { AutentifikacijaHelper } from './../../_helpers/autentifikacija-helper';
import { AutentifikacijaToken } from './../../_helpers/login-informacije';
import {
  StudentSnimiRequest,
  StudentSnimiEndpoint,
} from './../../Endpoints/student-endpoints/student-snimi-endpoint';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@microsoft/signalr';
import { OpstinaGetAllEndpoint } from 'src/app/Endpoints/opstina-endpoints/opstina-get-all-endpoint';
import { DataService } from 'src/app/_helpers/dataService';
declare function porukaSuccess(a: string): any;
declare function porukaError(a: string): any;
@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
})
export class StudentEditComponent implements OnInit {
  constructor(
    private opstinaGetAllEndpoint: OpstinaGetAllEndpoint,
    private router: Router,
    private dataService: DataService,
    private studentSnimiEndpoint: StudentSnimiEndpoint
  ) {}

  odabraniStudent: StudentSnimiRequest = null;
  opstinaPodaci: any = null;

  ngOnInit(): void {
    this.fetchOpstina();
    this.odabraniStudent = this.dataService.getData();
    this.odabraniStudent.opstinaID =
      AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.defaultOpstinaId;
  }

  private fetchOpstina() {
    this.opstinaGetAllEndpoint.obradi().subscribe({
      next: (x) => {
        this.opstinaPodaci = x;
        porukaSuccess('Uspjesno fetchOpstina....');
      },
      error: (x) => {
        porukaError('Error fetchOpstina + ' + x.error);
      },
    });
  }

  zatvori() {
    this.odabraniStudent = null;
    this.router.navigate(['/studenti']);
  }

  snimi() {
    this.studentSnimiEndpoint.obradi(this.odabraniStudent).subscribe({
      next: (x) => {
        porukaSuccess('Uspjesno studentSnimiEndpoint');
        this.router.navigate(['/studenti']);
      },
      error: (x) => {},
    });
  }
}
