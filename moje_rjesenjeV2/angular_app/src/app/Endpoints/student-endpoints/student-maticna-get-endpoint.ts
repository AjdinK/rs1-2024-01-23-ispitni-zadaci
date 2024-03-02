import { Observable } from 'rxjs';
import { MyBaseEndpoint } from '../my-base-endpoint';
import { Injectable } from '@angular/core';
import { MojConfig } from 'src/app/moj-config';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StudentMaticnaGetEndpoint
  implements MyBaseEndpoint<number, StudentMaticnaGetResponse>
{
  constructor(private httpKlijent: HttpClient) {}
  obradi(request: number): Observable<StudentMaticnaGetResponse> {
    let url =
      MojConfig.adresa_servera + '/StudentMaticna/Get?request=' + request;
    return this.httpKlijent.get<StudentMaticnaGetResponse>(url);
  }
}
export interface StudentMaticnaGetResponse {
  studentId: number;
  studentIme: string;
  studentPrezime: string;
  upisaneGodne: UpisaneGodne[];
}

export interface UpisaneGodne {
  id: number;
  akademskaGodina: string;
  godinaStudija: number;
  obnova: boolean;
  zimskiSemesterOvjera: number;
  zimskiSemesterUpis: string;
  evidentiraoKorsinik: EvidentiraoKorsinik;
}

export interface EvidentiraoKorsinik {
  id: number;
  korisnickoIme: string;
}
