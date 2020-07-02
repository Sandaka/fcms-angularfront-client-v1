import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduleDetails } from 'src/app/classes/save-schedule/scheduleDetails';

@Injectable({
  providedIn: 'root'
})
export class CreateScheduleService {

  private memberUrl = 'http://localhost:9090/fcms/v1/member';
  private scheduleUrl = 'http://localhost:9090/fcms/v1/schedule';
  private workoutUrl = 'http://localhost:9090/fcms/v1/workout';

  constructor(private http: HttpClient) { }

  getAllMembers(): Observable<any> {
    return this.http.get(`${this.memberUrl}` + "/for_schedule");
  }

  saveSchedule(scheduleDetails: ScheduleDetails): Observable<Object> {
    return this.http.post(`${this.scheduleUrl}`, scheduleDetails);
  }

  getAllWorkouts(): Observable<any> {
    return this.http.get(`${this.workoutUrl}`);
  }
}
