import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcements } from 'src/app/classes/announcements';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementServiceService {

  private baseUrl = 'http://localhost:9090/fcms/v1';

  constructor(private http: HttpClient) { }

  saveAnnouncement(announcement: Announcements): Observable<Object> {
    return this.http.post(`${this.baseUrl}/announcements`, announcement);
  }

  loadAnnouncements(): Observable<any> {
    return this.http.get(`${this.baseUrl}/announcements`);
  }
}
