import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { MemberCourseDetails } from 'src/app/classes/memberCourseDetails';
import { MemberScheduleDetail } from 'src/app/classes/view-schedule/memberScheduleDetail';
import { ScheduleWorkoutDetail } from 'src/app/classes/view-schedule/scheduleWorkoutDetail';
import { MemberViewScheduleService } from './member-view-schedule.service';

@Component({
  selector: 'app-member-view-schedule',
  templateUrl: './member-view-schedule.component.html',
  styleUrls: ['./member-view-schedule.component.scss']
})
export class MemberViewScheduleComponent implements OnInit {

  memberViewScheduleForm: FormGroup;
  memberId: string;

  courseDetails: Observable<MemberCourseDetails[]>;
  scheduleList: Observable<MemberScheduleDetail[]>;
  workoutList: Observable<ScheduleWorkoutDetail[]>
  selected_memberId: number = 0;
  selected_memberName: string = '';
  selected_memberWeight: string = '';
  selected_scheduleFrom: string = '';
  selected_scheduleTo: string = '';
  selected_trainer: string = '';
  selected_issuedby: string = '';

  constructor(private memberViewScheduleService: MemberViewScheduleService, private formBuilder: FormBuilder, private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.memberId = sessionStorage.getItem('memberId');

    this.findCourseDetailsAndSchedule(this.memberId);

    this.memberViewScheduleForm = this.formBuilder.group({
      scheduleNumber: [null, [Validators.required]]
    });
  }

  findCourseDetailsAndSchedule(membrid: any) {
    console.log("userid: " + membrid);
    // get course details
    this.memberViewScheduleService.getCourseDetails(membrid).subscribe(data => {
      console.log(data);
      this.courseDetails = data;
    });

    // get schedule list of selected member
    this.memberViewScheduleService.getAssignedSchedules(membrid).subscribe(data => {
      this.scheduleList = data;
    })
  }

  loadScedule(schedule: MemberScheduleDetail, targetModal) {
    // console.log("------ " + memberId + " " + schedule.fromDate);
    this.selected_issuedby = schedule.issuedBy;
    this.selected_memberId = schedule.memberId;
    this.selected_memberName = schedule.memberName;
    this.selected_memberWeight = schedule.currentWeight;
    this.selected_scheduleFrom = schedule.fromDate;
    this.selected_scheduleTo = schedule.toDate;
    this.selected_trainer = schedule.trainerName;

    this.memberViewScheduleService.getScheduleWorkouts(schedule.scheduleId).subscribe(data => {
      this.workoutList = data;
    });

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      scrollable: true,
      size: "xl"
    });
  }

  get scheduleNumber() {
    return this.memberViewScheduleForm.get("scheduleNumber");
  }

  // Toastr
  showError() {
    this.toastr.error('Something Went Wrong!', 'Please check again',
      { timeOut: 4000 });
  }
}
