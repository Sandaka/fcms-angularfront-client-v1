import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CreateScheduleService } from './create-schedule.service';
import { Observable } from 'rxjs';
import { Member } from 'src/app/classes/member';
import { ScheduleDetails } from 'src/app/classes/save-schedule/scheduleDetails';
import { MemberForSchedule } from 'src/app/classes/save-schedule/memberForSchedule';
import { ToastrService } from 'ngx-toastr';
import { Workout } from 'src/app/classes/workout';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent implements OnInit {

  // for date picker
  myDateValue: Date;
  memberList: Observable<MemberForSchedule[]>;
  scheduleDetails: ScheduleDetails;
  workoutsList: Observable<Workout[]>;

  data = {
    schedule: [
      {
        workout: "",
        workoutId: "",
        reps: "",
        forday: ""
      }
    ]
  }

  createScheduleForm: FormGroup;


  constructor(private fb: FormBuilder, private createScheduleService: CreateScheduleService, private toastr: ToastrService) {
    this.createScheduleForm = this.fb.group({
      schedule: this.fb.array([]),
      memberregid: [null, [Validators.required]],
      schedulenumber: [null, [Validators.required]],
      fromdate: [null, [Validators.required]],
      todate: [null, [Validators.required]],
      period: [null, [Validators.required]],
      weight: [null, [Validators.required]]
    })
    this.setWorkoutDetails();
  }

  ngOnInit() {
    // date picker
    this.myDateValue = new Date();

    this.loadMembers();
    this.loadWorkouts();
  }

  loadMembers() {
    this.createScheduleService.getAllMembers().subscribe(data => {
      this.memberList = data;
    });
  }


  addNewWorkout(workoutName) {
    let control = <FormArray>this.createScheduleForm.controls.schedule;
    console.log(workoutName);
    control.push(
      this.fb.group({
        // city: [a],
        reps: [''],
        workout: [workoutName],
        workoutId: [workoutName],
        forday: ['']
        // addressLines: this.fb.array([])
      })
    )

    console.log(this.createScheduleForm.value);
  }

  deleteWorkout(index) {
    let control = <FormArray>this.createScheduleForm.controls.schedule;
    control.removeAt(index)
  }

  setWorkoutDetails() {
    let control = <FormArray>this.createScheduleForm.controls.schedule;
    this.data.schedule.forEach(x => {
      if (null !== x.workout && '' !== x.workout) {
        control.push(this.fb.group({
          workout: x.workout,
          reps: x.reps,
          forday: x.forday
          // addressLines: this.setAddressLines(x) 
        }))
      }

    })

    console.log(this.createScheduleForm.value)
  }

  loadWorkouts() {
    this.createScheduleService.getAllWorkouts().subscribe(data => {
      this.workoutsList = data;
    });
  }

  onSubmit() {
    // alert(this.createScheduleForm.value);
    this.scheduleDetails = this.createScheduleForm.value;
    this.scheduleDetails.lastEdit = sessionStorage.getItem('authenticatedUser');
    console.log(this.scheduleDetails);
    this.createScheduleService.saveSchedule(this.scheduleDetails).subscribe(data => {
      console.log(data), error => console.log(error)
      if (data) {
        this.showSuccess();
      } else {
        this.showError();
      }

    });
  }


  // date picker
  onDateChange(newDate: Date) {
    console.log(newDate);
  }

  get memberregid() {
    return this.createScheduleForm.get("memberregid");
  }

  get schedulenumber() {
    return this.createScheduleForm.get("schedulenumber");
  }

  get fromdate() {
    return this.createScheduleForm.get("fromdate");
  }

  get todate() {
    return this.createScheduleForm.get("todate");
  }

  get period() {
    return this.createScheduleForm.get("period");
  }

  get weight() {
    return this.createScheduleForm.get("weight");
  }


  // Toastr
  showSuccess() {
    this.toastr.success('New Member Added', 'Successfully!',
      { timeOut: 3000 });;
  }
  showError() {
    this.toastr.error('Something Went Wrong!', 'Please check again',
      { timeOut: 4000 });
  }
}
