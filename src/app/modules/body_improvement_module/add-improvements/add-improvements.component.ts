import { Component, OnInit } from '@angular/core';
import { AdminViewScheduleService } from '../../workout_module/admin-view-schedule/admin-view-schedule.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Member } from 'src/app/classes/member';
import { Observable } from 'rxjs';
import { MemberCourseDetails } from 'src/app/classes/memberCourseDetails';
import { MemberScheduleDetail } from 'src/app/classes/view-schedule/memberScheduleDetail';
import { MemberForSchedule } from 'src/app/classes/save-schedule/memberForSchedule';
import { CreateScheduleService } from '../../workout_module/create-schedule/create-schedule.service';
import { BodyImprovements } from 'src/app/classes/bodyImprovements';
import { AddImprovementsService } from './add-improvements.service';

@Component({
  selector: 'app-add-improvements',
  templateUrl: './add-improvements.component.html',
  styleUrls: ['./add-improvements.component.scss']
})
export class AddImprovementsComponent implements OnInit {

  memberList: Observable<MemberForSchedule[]>;
  courseDetails: Observable<MemberCourseDetails[]>;
  scheduleList: Observable<MemberScheduleDetail[]>;

  addBodyImprovementsForm: FormGroup;

  constructor(private addImprovementService: AddImprovementsService, private adminViewScheduleService: AdminViewScheduleService, private formBuilder: FormBuilder, private toastr: ToastrService, private modalService: NgbModal, private createScheduleService: CreateScheduleService) { }

  ngOnInit() {
    this.loadMembers();
    this.addBodyImprovementsForm = this.formBuilder.group({
      memberId: [null, [Validators.required]],
      scheduleId: [null, [Validators.required]],
      shoulder: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      chest: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      thighs: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      calves: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      bycepTricep: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      abs: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      forearms: [null, [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  loadMembers() {
    this.createScheduleService.getAllMembers().subscribe(data => {
      this.memberList = data;
    });
  }

  findSchedules(memberId: number) {
    console.log("memberid: " + memberId);
    // get schedule list of selected member
    this.adminViewScheduleService.getAssignedSchedules(memberId).subscribe(data => {
      this.scheduleList = data;
    })
  }

  saveImprovements(bodyImprovements: BodyImprovements) {
    bodyImprovements.lastEdit = sessionStorage.getItem('authenticatedUser');
    this.addImprovementService.saveMeasurements(bodyImprovements).subscribe(data => {
      console.log(data), error => console.log(error)
      if (data) {
        this.showSuccess();
      } else {
        this.showError();
      }

    });
  }

  get memberId() {
    return this.addBodyImprovementsForm.get("memberId");
  }

  get scheduleId() {
    return this.addBodyImprovementsForm.get("scheduleId");
  }

  get shoulder() {
    return this.addBodyImprovementsForm.get("shoulder");
  }

  get chest() {
    return this.addBodyImprovementsForm.get("chest");
  }

  get thighs() {
    return this.addBodyImprovementsForm.get("thighs");
  }

  get calves() {
    return this.addBodyImprovementsForm.get("calves");
  }

  get bycepTricep() {
    return this.addBodyImprovementsForm.get("bycepTricep");
  }

  get abs() {
    return this.addBodyImprovementsForm.get("abs");
  }

  get forearms() {
    return this.addBodyImprovementsForm.get("forearms");
  }


  // Toastr
  showSuccess() {
    this.toastr.success('Body Improvements Added', 'Successfully!',
      { timeOut: 3000 });;
  }
  showError() {
    this.toastr.error('Something Went Wrong!', 'Please check again',
      { timeOut: 4000 });
  }
}