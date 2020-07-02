import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  private baseUserRoleUrl = 'http://localhost:9090/fcms/v1/userrole';
  private baseUrl = 'http://localhost:9090/fcms/v1/user';

  constructor(private http: HttpClient) { }

  getUserRoleList(): Observable<any> {
    return this.http.get(`${this.baseUserRoleUrl}`);
  }

  findUserNameExists(userName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userName}`);
  }

  createNewUser(user: User): Observable<Object> {
    // const headers = new HttpHeaders();
    // headers.set('Content-Type', 'application/json; charset=utf-8');
    console.log(user.username);
    console.log(user.password);
    console.log(user.userroleid);
    return this.http.post(`${this.baseUrl}`, user);
  }
}
