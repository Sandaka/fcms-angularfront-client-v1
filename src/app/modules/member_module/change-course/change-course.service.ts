import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectedCourse } from 'src/app/classes/member-course-update/selectedCourse';

@Injectable({
  providedIn: 'root'
})
export class ChangeCourseService {

  private baseUrl = 'http://localhost:9090/fcms/v1';

  constructor(private http: HttpClient) { }

  getAlltrainers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trainer`);
  }

  getAllMembers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/member`);
  }

  getCourseDetails(memberid: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/member/getCourseAndMenberDetails/` + memberid);
  }

  activateCourse(memberId: any, course: SelectedCourse): Observable<any> {
    return this.http.put(`${this.baseUrl}/member/activateCourse/${memberId}`, course);
  }

  inactivateCourse(memberId: any, course: SelectedCourse): Observable<any> {
    return this.http.put(`${this.baseUrl}/member/inactivateCourse/${memberId}`, course);
  }

  changeTrainer(memberId: any, trainerId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/member/changeTrainer/${memberId}/${trainerId}`);
  }
}
