import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Workout } from 'src/app/classes/workout';
import { ViewOnlyGuidelineService } from './view-only-guideline.service';

@Component({
  selector: 'app-view-only-guideline',
  templateUrl: './view-only-guideline.component.html',
  styleUrls: ['./view-only-guideline.component.scss']
})
export class ViewOnlyGuidelineComponent implements OnInit {

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  messages: string;
  imageName: any;
  workoutId: string;
  workoutsList: Observable<Workout[]>;

//   // create local data
//   public data: string[] = [
//     'Águilas',
//     'Ajedrez',
//     'Ala Delta',
//     'Álbumes de Música',
//     'Alusivos',
//     'Análisis de Escritura a Mano',
//     'Dyarbakır',
//     'Derepazarı ',
//     'Gülümsemek ',
//     'Teşekkürler',
//     'Güle güle.',
//     'Gülhatmi',
//     'Gülünç'
// ];

  constructor(private httpClient: HttpClient, private viewOnlyGuidelineService: ViewOnlyGuidelineService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadWorkouts();
  }

  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {

    this.imageName = "Billy-large.jpg";
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:9090/fcms/v1/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.imagepath;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;

        }
      );
  }

  getImagesByWorkout(event: any) {

    console.log(event.target.value);
    this.workoutId = event.target.value;
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:9090/fcms/v1/getByWorkoutId/' + this.workoutId)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.imagepath;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        },
        error => {
          this.noActiveGuidelines();
        }

      );
  }

  loadWorkouts() {
    console.log("loadWorkouts");
    this.viewOnlyGuidelineService.getAllWorkouts2().subscribe(data => {
      this.workoutsList = data;
    });
  }

  noActiveGuidelines() {
    this.toastr.error('for this workout!', 'No Active Guidelines',
      { timeOut: 4000 });
  }
}
