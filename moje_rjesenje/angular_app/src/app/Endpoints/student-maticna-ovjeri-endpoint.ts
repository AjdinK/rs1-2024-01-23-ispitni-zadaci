import { Observable } from "rxjs";
import {MyBaseEndpoint} from "./my-base-endpoint";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {EvidentiraoKorsinik} from "./student-maticna-get-endpoint";

@Injectable({providedIn:"root"})
export class StudentMaticnaOvjeriEndpoint implements MyBaseEndpoint<StudentMaticnaOvjeriRequest, number>{
  constructor(private httpKlijent:HttpClient) {}
  obradi(request: StudentMaticnaOvjeriRequest): Observable<number> {
    let url = "http://localhost:5000/StudentMaticna/Ovjeri";
    return this.httpKlijent.post <number>(url,request);
  }
}

export  interface  StudentMaticnaOvjeriRequest {
  id:number;
  zimskiSemsterOvjera:Date;
  napomena:string;
}

