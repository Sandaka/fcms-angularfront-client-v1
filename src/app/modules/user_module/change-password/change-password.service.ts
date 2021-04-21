import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  private baseUrl = 'http://localhost:9090/fcms/v1';

  constructor(private http: HttpClient) { }

  updatePassword(userId: any, user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/changePassword/${userId}`, user);
  }
}
