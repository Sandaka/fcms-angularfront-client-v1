import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Workout } from 'src/app/classes/workout';

@Injectable({
  providedIn: 'root'
})
export class AddWorkoutService {

  private workoutUrl = 'http://localhost:9090/fcms/v1/workout';

  constructor(private http: HttpClient) { }

  getAllWorkouts(): Observable<any> {
    return this.http.get(`${this.workoutUrl}`);
  }

  saveNewWorkout(workout: Workout): Observable<Object> {
    return this.http.post(`${this.workoutUrl}`, workout);
  }

  updateWorkout(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.workoutUrl}/${id}`, value);
  }

  deleteWorkout(id: number): Observable<any> {
    return this.http.delete(`${this.workoutUrl}/${id}`, { responseType: 'text' });
  }
}
