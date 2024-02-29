import { Observable } from 'rxjs';
import { MyBaseEndpoint } from '../my-base-endpoint';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MojConfig } from 'src/app/moj-config';

@Injectable({ providedIn: 'root' })
export class OpstinaGetAllEndpoint implements MyBaseEndpoint<void, any> {
  constructor(private httpKlijent: HttpClient) {}
  obradi(request: void): Observable<any> {
    let url = MojConfig.adresa_servera + '/Opstina/GetByAll';
    return this.httpKlijent.get<any>(url);
  }
}
