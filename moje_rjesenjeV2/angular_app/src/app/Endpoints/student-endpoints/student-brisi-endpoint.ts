import { Observable } from 'rxjs';
import { MyBaseEndpoint } from '../my-base-endpoint';
import { Injectable } from '@angular/core';
import { MojConfig } from 'src/app/moj-config';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StudentBrisiEndpoint implements MyBaseEndpoint<number, number> {
  constructor(private httpKlijent: HttpClient) {}
  obradi(request: number): Observable<number> {
    let url = MojConfig.adresa_servera + '/student/brisi?request=' + request;
    return this.httpKlijent.delete<number>(url);
  }
}
