import { Observable } from "rxjs";
import {MyBaseEndpoint} from "./my-base-endpoint";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({providedIn:"root"})
export class StudentBrisiEndpoint implements MyBaseEndpoint<number, number>{
  constructor(private httpKlijent:HttpClient) {
  }
  obradi(request: number): Observable<number> {
    let url = "http://localhost:5000/student/brisi?request=" + request;
    return this.httpKlijent.delete<number>(url);
  }
}
