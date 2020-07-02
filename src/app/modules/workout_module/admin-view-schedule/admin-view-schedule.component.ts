import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/classes/member';
import { MemberCourseDetails } from 'src/app/classes/memberCourseDetails';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminViewScheduleService } from './admin-view-schedule.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberScheduleDetail } from 'src/app/classes/view-schedule/memberScheduleDetail';
import { ScheduleWorkoutDetail } from 'src/app/classes/view-schedule/scheduleWorkoutDetail';

@Component({
  selector: 'app-admin-view-schedule',
  templateUrl: './admin-view-schedule.component.html',
  styleUrls: ['./admin-view-schedule.component.scss']
})
export class AdminViewScheduleComponent implements OnInit {

  memberList: Observable<Member[]>;
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

  adminViewScheduleForm: FormGroup;

  constructor(private adminViewScheduleService: AdminViewScheduleService, private formBuilder: FormBuilder, private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadMembers();
    this.adminViewScheduleForm = this.formBuilder.group({
      memberId: [null, [Validators.required]],
      scheduleNumber: [null, [Validators.required]]
    });
  }

  loadMembers() {
    this.adminViewScheduleService.getAllMembers().subscribe(data => {
      this.memberList = data;
    });
  }

  findCourseDetailsAndSchedule(memberId: number) {
    console.log("memberid: " + memberId);
    // get course details
    this.adminViewScheduleService.getCourseDetails(memberId).subscribe(data => {
      console.log(data);
      this.courseDetails = data;
    });

    // get schedule list of selected member
    this.adminViewScheduleService.getAssignedSchedules(memberId).subscribe(data => {
      this.scheduleList = data;
    })
  }

  loadScedule(memberId: number, schedule: MemberScheduleDetail, targetModal) {
    console.log("------ " + memberId + " " + schedule.fromDate);
    this.selected_issuedby = schedule.issuedBy;
    this.selected_memberId = schedule.memberId;
    this.selected_memberName = schedule.memberName;
    this.selected_memberWeight = schedule.currentWeight;
    this.selected_scheduleFrom = schedule.fromDate;
    this.selected_scheduleTo = schedule.toDate;
    this.selected_trainer = schedule.trainerName;

    this.adminViewScheduleService.getScheduleWorkouts(schedule.scheduleId).subscribe(data => {
      this.workoutList = data;
    });

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      scrollable: true,
      size: "xl"
    });
  }


  get memberId() {
    return this.adminViewScheduleForm.get("memberId");
  }

  get scheduleNumber() {
    return this.adminViewScheduleForm.get("scheduleNumber");
  }

  // Toastr
  showError() {
    this.toastr.error('Something Went Wrong!', 'Please check again',
      { timeOut: 4000 });
  }
}
