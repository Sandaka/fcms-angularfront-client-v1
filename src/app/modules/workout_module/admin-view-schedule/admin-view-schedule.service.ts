import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminViewScheduleService {

  private memberUrl = 'http://localhost:9090/fcms/v1/member';
  private memberCourseUrl = 'http://localhost:9090/fcms/v1/member/course_detail';
  private scheduleUrl = 'http://localhost:9090/fcms/v1/schedule';
  private workoutListUrl = 'http://localhost:9090/fcms/v1/workout_list';

  constructor(private http: HttpClient) { }

  getAllMembers(): Observable<any> {
    return this.http.get(`${this.memberUrl}`);
  }

  getCourseDetails(id: number): Observable<any> {
    return this.http.get(`${this.memberCourseUrl}/${id}`);
  }

  getAssignedSchedules(memberId: number): Observable<any> {
    return this.http.get(`${this.scheduleUrl}?memberId=${memberId}`);
  }

  getScheduleWorkouts(scheduleId: number): Observable<any> {
    return this.http.get(`${this.workoutListUrl}?scheduleId=${scheduleId}`);
  }
}
