import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class AdminUpdateUserService {

  private userUrl = 'http://localhost:9090/fcms/v1/user';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.userUrl}`);
  }

  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.userUrl}/${id}`, value);
  }

  inactiveUser(id: number): Observable<any> {
    return this.http.delete(`${this.userUrl}/${id}`, { responseType: 'text' });
  }

  changeStatus(userId: any, user: User): Observable<any> {
    return this.http.put(`${this.userUrl}/updateStatus/` + userId, user);
  }
}
