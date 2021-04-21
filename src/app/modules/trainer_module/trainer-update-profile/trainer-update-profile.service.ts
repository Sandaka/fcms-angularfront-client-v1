import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerUpdateProfileService {

  private baseUrl = "http://localhost:9090/fcms/v1"

  constructor(private http: HttpClient) { }

  getTrainerDetailsById(trainerId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/trainer/` + trainerId);
  }

  updateTrainer(trainerId: any, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/trainer/${trainerId}`, value);
  }
}
