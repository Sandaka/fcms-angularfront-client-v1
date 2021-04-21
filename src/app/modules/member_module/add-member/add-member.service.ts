import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from 'src/app/classes/course';
import { MemberDetails } from 'src/app/classes/memberDetails';

@Injectable({
  providedIn: 'root'
})
export class AddMemberService {

  public courseUrl = 'http://localhost:9090/fcms/v1/course';
  private trainerUrl = 'http://localhost:9090/fcms/v1/trainer';
  private userUrl = 'http://localhost:9090/fcms/v1/user';
  private memberUrl = 'http://localhost:9090/fcms/v1/member';

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<any> {
    return this.http.get(`${this.courseUrl}`);
  }

  getAlltrainers(): Observable<any> {
    return this.http.get(`${this.trainerUrl}`);
  }

  loadMemberUserNames(): Observable<any> {
    return this.http.get(`${this.userUrl}` + "/members");
  }

  saveMemberDetails(memberDetails: MemberDetails): Observable<Object> {
    return this.http.post(`${this.memberUrl}`, memberDetails);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.userUrl}`);
  }
}
