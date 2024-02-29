import {MyBaseEndpoint} from "./my-base-endpoint";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StudentSnimiRequest} from "./student-snimi-endpoint";
import {Injectable} from "@angular/core";

@Injectable({providedIn:"root"})
export class StudentMaticnaGetEndpoint implements MyBaseEndpoint<number, StudentMaticnaGetResponse> {
  constructor(private httpKlijent:HttpClient) {
  }
  obradi(request: number): Observable<StudentMaticnaGetResponse> {
    let url = "http://localhost:5000/StudentMaticna/Get?request="+request;
    return this.httpKlijent.get<StudentMaticnaGetResponse>(url);
  }
}

export interface  StudentMaticnaGetResponse{
  studentID:number;
  studentIme:string;
  studentPrezime:string;
  upisaneGodine : UpisaneGodine
}

export interface  UpisaneGodine {
  id:number;
  akademskaGodina:string;
  godinaStudija:number;
  obnova:boolean;
  zimskiSemsterUpis:string;
  zimskiSemsterOvjera:string;
  evidentiraoKorsinik : EvidentiraoKorsinik
}
export interface  EvidentiraoKorsinik {
  id:number;
  korsinickoIme:string;
}
