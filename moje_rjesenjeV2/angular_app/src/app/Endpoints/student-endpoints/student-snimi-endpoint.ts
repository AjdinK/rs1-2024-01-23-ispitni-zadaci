import { Observable } from 'rxjs';
import { MyBaseEndpoint } from '../my-base-endpoint';
import { Injectable } from '@angular/core';
import { MojConfig } from 'src/app/moj-config';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StudentSnimiEndpoint
  implements MyBaseEndpoint<StudentSnimiRequest, number>
{
  constructor(private httpKlijent: HttpClient) {}
  obradi(request: StudentSnimiRequest): Observable<number> {
    let url = MojConfig.adresa_servera + '/student/snimi';
    return this.httpKlijent.post<number>(url, request);
  }
}
export interface StudentSnimiRequest {
  id: number;
  ime: string;
  prezime: string;
  opstinaID: number;
}
