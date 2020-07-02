import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout } from 'src/app/classes/workout';
import { AddWorkoutService } from './add-workout.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss']
})
export class AddWorkoutComponent implements OnInit {

  workoutsList: Observable<Workout[]>;
  addWorkoutForm: FormGroup;
  updateWorkoutForm: FormGroup;
  deleteWorkoutForm: FormGroup;

  constructor(private addWorkoutService: AddWorkoutService, private modalService: NgbModal, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadWorkouts();
    this.addWorkoutForm = this.formBuilder.group({
      workoutname: [null, [Validators.required]],
      othernames: [null],
      effectto: [null]
    });

    this.updateWorkoutForm = this.formBuilder.group({
      workoutname: [null, [Validators.required]],
      othernames: [null],
      effectto: [null],
      workoutid: [null]
    });

    this.deleteWorkoutForm = this.formBuilder.group({
      workoutname: [null, [Validators.required]],
      workoutid: [null]
    });
  }

  // adding data
  get workoutname() {
    return this.addWorkoutForm.get("workoutname");
  }

  get othernames() {
    return this.addWorkoutForm.get("othernames");
  }

  get effectto() {
    return this.addWorkoutForm.get("effectto");
  }

  // updates
  get u_workoutname() {
    return this.updateWorkoutForm.get("workoutname");
  }

  get u_othernames() {
    return this.updateWorkoutForm.get("othernames");
  }

  get u_effectto() {
    return this.updateWorkoutForm.get("effectto");
  }

  get u_workoutid() {
    return this.updateWorkoutForm.get("workoutid");
  }

  // delete
  get d_workoutname() {
    return this.updateWorkoutForm.get("workoutname");
  }

  get d_workoutid() {
    return this.updateWorkoutForm.get("workoutid");
  }

  saveWorkout(newWorkout: Workout) {
    console.log(newWorkout.workoutname);
    newWorkout.lastEdit = sessionStorage.getItem('authenticatedUser');
    this.addWorkoutService.saveNewWorkout(newWorkout).subscribe(data => {
      console.log(data), error => console.log(error)
      if (data) {
        this.showSuccess();
        this.loadWorkouts();
        this.closeModal("addWorkoutModal");
      } else {
        this.showError();
      }
    });
  }

  updateWorkout(updateData: Workout) {
    console.log(updateData.workoutname);
    updateData.lastEdit = sessionStorage.getItem('authenticatedUser');
    this.addWorkoutService.updateWorkout(updateData.workoutid, updateData).subscribe(data => {
      console.log(data), error => console.log(error)
      if (data) {
        this.showUpdateSuccess();
        this.loadWorkouts();
        this.closeModal("editWorkoutModal")
      } else {
        this.showError();
      }
    });
  }

  deleteWorkout(data: Workout) {
    console.log("deleting... " + data.workoutname + " " + data.workoutid);
    this.addWorkoutService.deleteWorkout(data.workoutid).subscribe(data => {
      console.log(data), error => console.log(error)
      if (data) {
        this.showDeleteSuccess();
        this.loadWorkouts();
        this.closeModal("deleteWorkoutModal");
      } else {
        this.showError();
      }
    });
  }

  loadWorkouts() {
    this.addWorkoutService.getAllWorkouts().subscribe(data => {
      this.workoutsList = data;
    });
  }

  // for add modal
  openModal(targetModal) {
    console.log("modal method...");
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  }

  // for update modal
  openEditModal(targetModal, workout) {
    console.log("update modal method...");
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
      // size: "xl"
    });

    this.updateWorkoutForm.patchValue({
      workoutname: workout.workoutname,
      workoutid: workout.workoutid,
      othernames: workout.othernames,
      effectto: workout.effectto
    });
  }

  closeModal(targetModal) {
    this.modalService.dismissAll(targetModal)
  }

  // for delete modal
  openConfirmModal(targetModal, id, name) {
    console.log("delete : " + name);
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.deleteWorkoutForm.patchValue({
      workoutname: name,
      workoutid: id
    });
  }

  // Toastr
  showSuccess() {
    this.toastr.success('New Workout Added', 'Successfully!',
      { timeOut: 3000 });;
  }
  showError() {
    this.toastr.error('Something Went Wrong!', 'Please check again',
      { timeOut: 4000 });
  }

  showUpdateSuccess() {
    this.toastr.success('Workout  has been Updated', 'Successfully!',
      { timeOut: 3000 });;
  }

  showDeleteSuccess() {
    this.toastr.success('Workout has been Deleted', 'Successfully!',
      { timeOut: 3000 });;
  }
}
