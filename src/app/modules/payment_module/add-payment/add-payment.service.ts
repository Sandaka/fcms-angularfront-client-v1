import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeePayment } from 'src/app/classes/feePayment';

@Injectable({
  providedIn: 'root'
})
export class AddPaymentService {

  private memberUrl = 'http://localhost:9090/fcms/v1/member';
  private memberCourseUrl = 'http://localhost:9090/fcms/v1/member/course_detail';
  private feeUrl = 'http://localhost:9090/fcms/v1/feePayment';

  constructor(private http: HttpClient) { }

  getAllMembers(): Observable<any> {
    return this.http.get(`${this.memberUrl}`);
  }

  getCourseDetails(id: number): Observable<any> {
    return this.http.get(`${this.memberCourseUrl}/${id}`);
  }

  savePayment(feePayment: FeePayment): Observable<Object> {
    return this.http.post(`${this.feeUrl}`, feePayment);
  }
}
