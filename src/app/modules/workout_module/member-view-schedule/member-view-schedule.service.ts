import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberViewScheduleService {

  private baseUrl = 'http://localhost:9090/fcms/v1';

  constructor(private http: HttpClient) { }

  getCourseDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/member/course_detail/${id}`);
  }

  getAssignedSchedules(memberId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/schedule?memberId=${memberId}`);
  }

  getScheduleWorkouts(scheduleId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/workout_list?scheduleId=${scheduleId}`);
  }
}
