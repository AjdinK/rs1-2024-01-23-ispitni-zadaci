import { Observable } from 'rxjs';
import { MyBaseEndpoint } from '../my-base-endpoint';
import { Injectable } from '@angular/core';
import { MojConfig } from 'src/app/moj-config';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StudentMaticnaSnimiEndpoint
  implements MyBaseEndpoint<StudentMaticnaSnimiRequest, number>
{
  constructor(private httpKlijent: HttpClient) {}
  obradi(request: StudentMaticnaSnimiRequest): Observable<number> {
    let url = MojConfig.adresa_servera + '/StudentMaticna/Snimi';
    return this.httpKlijent.post<number>(url, request);
  }
}
export interface StudentMaticnaSnimiRequest {
  id: number;
  akademskaGodinaId: number;
  godinaStudija: number;
  obnova: boolean;
  zimskiSemesterUpis: Date;
  cijenaSkolarine: number;
  evidentiraoKorsinikId: number;
}
