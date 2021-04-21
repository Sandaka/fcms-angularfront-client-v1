import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberBodyImprovementsService {

  private baseUrl = 'http://localhost:9090/fcms/v1';

  constructor(private http: HttpClient) { }

  getSchedulesByMemberId(memberId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/schedule?memberId=` + memberId);
  }

  getImprovemtnsByScheduleId(sId1: any, sId2: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/bodyImprovementReportBySchedule/${sId1}/${sId2}`);
  }
}
