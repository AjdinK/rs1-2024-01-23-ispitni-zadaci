import { Injectable } from '@angular/core';
import { StudentSnimiRequest } from '../Endpoints/student-endpoints/student-snimi-endpoint';

@Injectable({ providedIn: 'root' })
export class DataService {
  private odabraniStudent: StudentSnimiRequest;

  setData(data: StudentSnimiRequest) {
    this.odabraniStudent = data;
  }

  getData() {
    return this.odabraniStudent;
  }
}
