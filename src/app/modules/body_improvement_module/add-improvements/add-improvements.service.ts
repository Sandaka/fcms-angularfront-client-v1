import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BodyImprovements } from 'src/app/classes/bodyImprovements';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddImprovementsService {

  private measurementUrl = 'http://localhost:9090/fcms/v1/measurement';

  constructor(private http: HttpClient) { }

  saveMeasurements(bodyImprovements: BodyImprovements): Observable<Object> {
    return this.http.post(`${this.measurementUrl}`, bodyImprovements);
  }
}
