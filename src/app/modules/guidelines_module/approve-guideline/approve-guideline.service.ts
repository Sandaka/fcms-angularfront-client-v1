import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guideline } from 'src/app/classes/Guideline';

@Injectable({
  providedIn: 'root'
})
export class ApproveGuidelineService {

  private baseUrl = 'http://localhost:9090/fcms/v1';

  constructor(private http: HttpClient) { }

  getPendingGuidelines(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pending_list/`);
  }

  activate(guidelineId: string, status: Guideline): Observable<Object> {
    // let body = new HttpParams()
    // body.set('guidelineId', guidelineId);
    return this.http.put(`${this.baseUrl}/approve_guideline/` + guidelineId, status);
  }

}
