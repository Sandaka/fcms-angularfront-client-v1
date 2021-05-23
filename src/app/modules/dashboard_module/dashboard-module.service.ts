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

  getAdminPendingApprovals(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/dashboard/approvals`);
  }

  getAnnouncements(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/dashboard/announcements`);
  }

  getAdminPendingPayments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/dashboard/pendingPayments`);
  }

  getAdminExpiringSchedules(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/dashboard/schedules`);
  }

  getTrainerPendingPayments(trainerId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/trainer/dashboard/pendingPayments/` + trainerId);
  }

  getTrainerExpiringSchedules(trainerId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/trainer/dashboard/schedules/` + trainerId);
  }

  getTrainerMemberCount(trainerId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/trainer/dashboard/memberCount/` + trainerId);
  }

  getMemberScheduleCount(memberId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/member/dashboard/scheduleCount/` + memberId);
  }
}
