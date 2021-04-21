import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthlyReportService {

  private baseUrl = 'http://localhost:9090/fcms/v1';

  constructor(private http: HttpClient) { }

  getMonthlyReportData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/monthlyReport`);
  }
}
