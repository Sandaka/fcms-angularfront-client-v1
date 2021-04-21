import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardModuleService {

  private baseUrl = 'http://localhost:9090/fcms/v1';

  constructor(private http: HttpClient) { }

  getMemberBIReport(memberId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/bodyImprovementReport/${memberId}`);
  }

  generateAdminMonthlyGraph(): Observable<any> {
    return this.http.get(`${this.baseUrl}/graph/monthlyReport`);
  }

  generateAdminAnnualGraph(): Observable<any> {
    return this.http.get(`${this.baseUrl}/graph/annualReport`);
  }
}
