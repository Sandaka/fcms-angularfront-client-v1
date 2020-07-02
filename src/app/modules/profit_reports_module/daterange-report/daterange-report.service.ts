import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DaterangeReportService {

  private selectedPeriodReportUrl = 'http://localhost:9090/fcms/v1/selectedPeriodReport';

  constructor(private http: HttpClient) { }

  getSelectedPeriodReportData(from: string, to: string): Observable<any> {
    return this.http.get(`${this.selectedPeriodReportUrl}?fromDate=${from}&toDate=${to}`);
  }
}
