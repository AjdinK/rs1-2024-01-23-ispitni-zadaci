import { Observable } from "rxjs";
import {MyBaseEndpoint} from "./my-base-endpoint";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {EvidentiraoKorsinik} from "./student-maticna-get-endpoint";

@Injectable({providedIn:"root"})
export class StudentMaticnaSnimiEndpoint implements MyBaseEndpoint<StudentMaticnaSnimiRequest, number>{
  constructor(private httpKlijent:HttpClient) {
  }
  obradi(request: StudentMaticnaSnimiRequest): Observable<number> {
    let url = "http://localhost:5000/StudentMaticna/Dodaj";
    return this.httpKlijent.post <number>(url,request);
  }
}

export  interface  StudentMaticnaSnimiRequest{
  id:number;
  akademskaGodinaID:number;
  godinaStudija:number;
  obnova:boolean;
  zimskiSemsterUpis: Date;
  evidentiraoKorsinikID : number;
  cijenaSkolarine:number;
}

