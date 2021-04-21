import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrainerDetails } from 'src/app/classes/trainerDetails';

@Injectable({
  providedIn: 'root'
})
export class AddTrainerService {

  private trainerSpecUrl = 'http://localhost:9090/fcms/v1/trainerSpec';
  private userUrl = 'http://localhost:9090/fcms/v1/user';
  private trainerUrl = 'http://localhost:9090/fcms/v1/trainer';

  constructor(private http: HttpClient) { }

  loadTrainersSpecs(): any {
    return this.http.get(`${this.trainerSpecUrl}`);
  }

  loadTrainerUserNames(): Observable<any> {
    return this.http.get(`${this.userUrl}` + "/trainers");
  }

  saveTrainerDetails(trainer: TrainerDetails): Observable<Object> {
    return this.http.post(`${this.trainerUrl}`, trainer);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.userUrl}`);
  }
}
