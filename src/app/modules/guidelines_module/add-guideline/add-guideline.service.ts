import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guideline } from 'src/app/classes/Guideline';

@Injectable({
  providedIn: 'root'
})
export class AddGuidelineService {

  private baseUrl = 'http://localhost:9090/fcms/v1';
  private workoutUrl = 'http://localhost:9090/fcms/v1/workout';

  constructor(private http: HttpClient) { }

  inactivate(guidelineId: string, status: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/inactivate_guideline/` + guidelineId, status);
  }





  // new image uploader ============================================ (NO LONGER NEEDED)

  // ==============================================================


  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/static_upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  // upload(file: File, guideline: Guideline): Observable<Object> {
  //   guideline.file = file;

  //   return this.http.post(`${this.baseUrl}/upload_guideline2`, guideline);
  // }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

  getAllWorkouts(): Observable<any> {
    return this.http.get(`${this.workoutUrl}`);
  }
}
