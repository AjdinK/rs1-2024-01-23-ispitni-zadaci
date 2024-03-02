import { Observable } from 'rxjs';
import { MyBaseEndpoint } from '../my-base-endpoint';
import { Injectable } from '@angular/core';
import { MojConfig } from 'src/app/moj-config';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StudentMaticnaOvjeriEndpoint
  implements MyBaseEndpoint<StudentMaticnaOvjeriRequest, number>
{
  constructor(private httpKlijent: HttpClient) {}
  obradi(request: StudentMaticnaOvjeriRequest): Observable<number> {
    let url = MojConfig.adresa_servera + '/StudentMaticna/Ovjeri';
    return this.httpKlijent.post<number>(url, request);
  }
}
export interface StudentMaticnaOvjeriRequest {
  id: number;
  zimskiSemesterOvjera: Date;
  napomena: string;
}
