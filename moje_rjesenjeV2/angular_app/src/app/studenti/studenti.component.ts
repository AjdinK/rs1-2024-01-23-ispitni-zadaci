import { DataService } from './../_helpers/dataService';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MojConfig } from '../moj-config';
import { Router } from '@angular/router';
import {
  StudentSnimiEndpoint,
  StudentSnimiRequest,
} from '../Endpoints/student-endpoints/student-snimi-endpoint';
import { OpstinaGetAllEndpoint } from '../Endpoints/opstina-endpoints/opstina-get-all-endpoint';
import { AutentifikacijaHelper } from '../_helpers/autentifikacija-helper';
declare function porukaSuccess(a: string): any;
declare function porukaError(a: string): any;

@Component({
  selector: 'app-studenti',
  templateUrl: './studenti.component.html',
  styleUrls: ['./studenti.component.css'],
})
export class StudentiComponent implements OnInit {
  title: string = 'angularFIT2';
  ime_prezime: string = '';
  opstina: string = '';
  studentPodaci: any;
  filter_ime_prezime: boolean;
  filter_opstina: boolean;

  odabraniStudent: StudentSnimiRequest | null = null;
  opstinaPodaci: any;
  modalTitle: string = '';
  defaultOpstinaID =
    AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog
      .defaultOpstinaId;

  constructor(
    private httpKlijent: HttpClient,
    private router: Router,
    private studentSnimiEndpoint: StudentSnimiEndpoint,
    private opstinaGetAllEndpoint: OpstinaGetAllEndpoint,
    private dataService: DataService
  ) {}

  testirajWebApi(): void {
    this.httpKlijent
      .get(
        MojConfig.adresa_servera + '/Student/GetAll',
        MojConfig.http_opcije()
      )
      .subscribe((x) => {
        this.studentPodaci = x;
      });
  }

  ngOnInit(): void {
    this.testirajWebApi();
    this.fetchOpstina();
  }

  filtriaj() {
    if (this.studentPodaci == null) return [];

    return this.studentPodaci.filter(
      (x: any) =>
        (!this.filter_ime_prezime ||
          (x.ime + ' ' + x.prezime).startsWith(this.ime_prezime) ||
          (x.prezime + ' ' + x.ime).startsWith(this.ime_prezime)) &&
        (!this.filter_opstina ||
          x.opstina_rodjenja.description.startsWith(this.opstina))
    );
  }

  zatvori() {
    this.odabraniStudent = null;
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

  otvoriEdit(s: StudentSnimiRequest) {
    this.dataService.setData(s);
    porukaSuccess('set data');
    this.router.navigate(['/student-edit']);
  }

  otvoriAdd() {
    this.router.navigate(['/student-add']);
  }
}
