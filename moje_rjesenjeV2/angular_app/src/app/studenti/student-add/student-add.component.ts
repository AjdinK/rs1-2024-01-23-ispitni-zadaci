import { AutentifikacijaHelper } from './../../_helpers/autentifikacija-helper';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpstinaGetAllEndpoint } from 'src/app/Endpoints/opstina-endpoints/opstina-get-all-endpoint';
import {
  StudentSnimiEndpoint,
  StudentSnimiRequest,
} from 'src/app/Endpoints/student-endpoints/student-snimi-endpoint';
declare function porukaSuccess(a: string): any;
declare function porukaError(a: string): any;

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css'],
})
export class StudentAddComponent implements OnInit {
  constructor(
    private router: Router,
    private studentSnimiEndpoint: StudentSnimiEndpoint,
    private opstinaGetAllEndpoint: OpstinaGetAllEndpoint
  ) {}
  noviStudent: StudentSnimiRequest | null = null;
  opstinaPodaci: any = null;

  ngOnInit(): void {
    this.fetchOpstina();
    this.setDefaultValueStudent();
  }
  setDefaultValueStudent() {
    this.noviStudent = {
      id: 0,
      ime: '',
      prezime: '',
      opstinaID:
        AutentifikacijaHelper.getLoginInfo().autentifikacijaToken
          .korisnickiNalog.defaultOpstinaId,
    };
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
    this.noviStudent = null;
    this.router.navigate(['/studenti']);
  }

  snimi() {
    this.studentSnimiEndpoint.obradi(this.noviStudent!).subscribe({
      next: (x) => {
        porukaSuccess('Uspjesno studentSnimiEndpoint....');
        this.router.navigate(['/studenti']);
        this.noviStudent = null;
      },
      error: (x) => {
        porukaError('Error studentSnimiEndpoint' + x.error);
      },
    });
  }
}
