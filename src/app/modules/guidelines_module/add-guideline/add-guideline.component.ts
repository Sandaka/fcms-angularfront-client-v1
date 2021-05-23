import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Guideline } from 'src/app/classes/Guideline';
import { Workout } from 'src/app/classes/workout';
import { AddGuidelineService } from './add-guideline.service';

@Component({
  selector: 'app-add-guideline',
  templateUrl: './add-guideline.component.html',
  styleUrls: ['./add-guideline.component.scss']
})
export class AddGuidelineComponent implements OnInit {

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  fileInfos: Observable<any>;

  workoutsList: Observable<Workout[]>;
  addGuidelinesForm: FormGroup;


  constructor(private httpClient: HttpClient, private addGuidelineService: AddGuidelineService, private formBuilder: FormBuilder, private toastr: ToastrService, private modalService: NgbModal) { }


  // new file upload part ================================

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  messages: string;
  imageName: any;
  workoutId: string;
  lastEditRole: string;
  lastEdit: string;
  guidelineId: string;
  loggedUserRole: string;

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload(guideline: Guideline) {
    console.log(this.selectedFile);
    this.lastEditRole = sessionStorage.getItem('userRole');
    this.lastEdit = sessionStorage.getItem('authenticatedUser');

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:9090/fcms/v1/uploadImage/' + guideline.workoutId + '/' + this.lastEditRole + '/' + this.lastEdit, uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        console.log(response);
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );

      this.showSuccessAdded();
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
    this.loggedUserRole = sessionStorage.getItem('userRole');
    this.workoutId = event.target.value;
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:9090/fcms/v1/getByWorkoutId/' + this.workoutId)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.imagepath;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          this.guidelineId = this.retrieveResonse.guidelineid;
        }
      );
  }

  inactiveGuideline(guidelineid: string) {
    this.addGuidelineService.inactivate(guidelineid, "inactive").subscribe(data => {
      console.log(data), error => console.log(error)
      if (data) {
        this.showSuccessInactivate();
      } else {
        this.showErrorInactivate();
      }

    });

    this.showSuccessInactivate();
  }

  // =====================================================


  ngOnInit() {
    this.fileInfos = this.addGuidelineService.getFiles();
    this.loadWorkouts();
    this.addGuidelinesForm = this.formBuilder.group({
      workoutId: [null, [Validators.required]],
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload(guideline: Guideline) {
    console.log("=== : " + guideline.workoutId + " " + this.selectedFiles.item(0));
    guideline.lastEdit = sessionStorage.getItem('authenticatedUser');
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.addGuidelineService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.addGuidelineService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }


  // upload(guideline: Guideline) {
  //   console.log("=== : " + guideline.workoutId + " " + this.selectedFiles.item(0));
  //   guideline.lastEdit = sessionStorage.getItem('authenticatedUser');
  //   this.progress = 0;

  //   this.currentFile = this.selectedFiles.item(0);
  //   this.addGuidelineService.upload(this.currentFile, guideline).subscribe(data => {
  //     console.log(data), error => console.log(error)
  //     if (data) {
  //       console.log("success");
  //     } else {
  //       console.log("erroor");
  //     }

  //   });
  // }

  loadWorkouts() {
    this.addGuidelineService.getAllWorkouts().subscribe(data => {
      this.workoutsList = data;
    });
  }

  // Toastr
  showSuccessInactivate() {
    this.toastr.success('Guideline has been inactivated', 'Successfully!',
      { timeOut: 3000 });;
  }
  showErrorInactivate() {
    this.toastr.error('Something Went Wrong!', 'Please check again',
      { timeOut: 4000 });
  }

  showSuccessAdded() {
    this.toastr.success('Guideline has been added to the', 'Pending list!',
      { timeOut: 3000 });;
  }
}
