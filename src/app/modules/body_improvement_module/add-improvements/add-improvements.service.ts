import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BodyImprovements } from 'src/app/classes/bodyImprovements';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddImprovementsService {

  private measurementUrl = 'http://localhost:9090/fcms/v1/measurement';
  private baseUrl = 'http://localhost:9090/fcms/v1';

  constructor(private http: HttpClient) { }

  saveMeasurements(bodyImprovements: BodyImprovements): Observable<any> {
    return this.http.post(`${this.measurementUrl}`, bodyImprovements);
  }

  getAssgnedMembers(trainerId: any): Observable<any>{
    return this.http.get(`${this.baseUrl}/member/for_schedule/` + trainerId);
  }
}
