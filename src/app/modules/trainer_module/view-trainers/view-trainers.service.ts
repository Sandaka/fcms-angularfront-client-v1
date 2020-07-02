import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewTrainersService {

  private trainerUrl = 'http://localhost:9090/fcms/v1/trainer';

  constructor(private http: HttpClient) { }

  getAlltrainers(): Observable<any> {
    return this.http.get(`${this.trainerUrl}`);
  }
}
