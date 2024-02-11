import { Observable } from "rxjs";
import {MyBaseEndpoint} from "./my-base-endpoint";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({providedIn:"root"})
export class StudentSnimiEndpoint implements MyBaseEndpoint<StudentSnimiRequest, number>{
  constructor(private httpKlijent:HttpClient) {
  }
    obradi(request: StudentSnimiRequest): Observable<number> {
      let url = "http://localhost:5000/student/snimi";
        return this.httpKlijent.post<number>(url,request);
    }
}

export  interface  StudentSnimiRequest {
  id:number;
  ime:string;
  prezime:string;
  opstinaID:number;
}

