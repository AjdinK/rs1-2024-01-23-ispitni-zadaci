import { Observable } from "rxjs";
import {MyBaseEndpoint} from "./my-base-endpoint";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({providedIn:"root"})
export class AkademskaGodinaGetEndpoint implements MyBaseEndpoint<void, any>{
  constructor(private httpKlijent:HttpClient) {}
  obradi(request: void): Observable<any> {
    let url = "http://localhost:5000/AkademskeGodine/GetAll_ForCmb";
    return this.httpKlijent.get<any>(url);
  }
}
