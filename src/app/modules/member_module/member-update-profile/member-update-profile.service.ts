import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberUpdateProfileService {

  private baseUrl = 'http://localhost:9090/fcms/v1';

  constructor(private http: HttpClient) { }

  getMemberDetails2(userId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/memberByUserId/` + userId);
  }

  updateMember(memberId: any, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/member/${memberId}`, value);
  }
}
