import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Member } from 'src/app/classes/member';
import { MemberCourseList } from 'src/app/classes/member-course-update/memberCourseList';
import { SelectedCourse } from 'src/app/classes/member-course-update/selectedCourse';
import { Trainer } from 'src/app/classes/trainer';
import { ChangeCourseService } from './change-course.service';

@Component({
  selector: 'app-change-course',
  templateUrl: './change-course.component.html',
  styleUrls: ['./change-course.component.scss']
})
export class ChangeCourseComponent implements OnInit {

  trainerList: Observable<Trainer[]>;
  memberList: Observable<Member[]>;

  memberCourseDetailList: MemberCourseList;
  activeCourses: SelectedCourse[] = [];
  inactiveCourses: SelectedCourse[] = [];

  refreshedCourseDetailList: MemberCourseList;

  memberId: number;
  fullName: string = '';
  firstName: string = '';
  lastName: string = '';
  addressLine1: string = '';
  addressLine2: string = '';
  addressLine3: string = '';
  email: string = '';
  nic: string = '';
  telephone1: string = '';
  telephone2: string = '';
  netFee: any = '';
  trainerId: number = 0;
  trainerName: string = '';
  age: number = 0;


  constructor(private changeCourseService: ChangeCourseService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadMembers();
    this.loadTrainers();
  }

  loadTrainers() {
    this.trainerList = this.changeCourseService.getAlltrainers();
    // this.changeCourseService.getAlltrainers().subscribe(data => {
    //   this.trainerList = data;
    //   console.log(this.trainerList);
    // });
  }

  loadMembers() {
    this.memberList = this.changeCourseService.getAllMembers();
    // this.changeCourseService.getAllMembers().subscribe(data => {
    //   this.memberList = data;
    //   console.log(this.memberList);
    // });
  }

  findCourseDetails(memberid: any) {
    console.log(memberid);
    this.changeCourseService.getCourseDetails(memberid).subscribe(data => {
      this.memberCourseDetailList = data;
      console.log(this.memberCourseDetailList);

      this.fullName = this.memberCourseDetailList.fullName;
      this.firstName = this.memberCourseDetailList.firstName;
      this.telephone1 = this.memberCourseDetailList.telephone1;
      this.telephone2 = this.memberCourseDetailList.telephone2;
      this.trainerId = this.memberCourseDetailList.trainerId;
      this.trainerName = this.memberCourseDetailList.trainerName;
      this.age = this.memberCourseDetailList.age;
      this.email = this.memberCourseDetailList.email;
      this.nic = this.memberCourseDetailList.nic;
      this.addressLine1 = this.memberCourseDetailList.addressLine1;
      this.addressLine2 = this.memberCourseDetailList.addressLine2;
      this.addressLine3 = this.memberCourseDetailList.addressLine3;
      this.memberId = this.memberCourseDetailList.memberId;

      this.activeCourses = this.memberCourseDetailList.activeCourses;
      this.inactiveCourses = this.memberCourseDetailList.inactiveCourses;
    });
  }

  activateCourse(course: SelectedCourse) {
    console.log(course);
    // decide the selectedCourseFee with age here
    if (this.age > 18) {
      course.selectedCourseFee = course.adultMonthlyFee;
    } else {
      course.selectedCourseFee = course.studentMonthlyFee;
    }

    this.changeCourseService.activateCourse(this.memberId, course).subscribe(data => {
      console.log(data);
      this.refreshedCourseDetailList = data;
      this.activeCourses = this.refreshedCourseDetailList.activeCourses;
      this.inactiveCourses = this.refreshedCourseDetailList.inactiveCourses;

      this.showSuccess();
    });
  }

  inactivateCourse(course: SelectedCourse) {
    console.log(course);
    // decide the selectedCourseFee with age here

    if (this.age > 18) {
      course.selectedCourseFee = course.adultMonthlyFee;
    } else {
      course.selectedCourseFee = course.studentMonthlyFee;
    }

    this.changeCourseService.inactivateCourse(this.memberId, course).subscribe(data => {
      console.log(data);
      this.refreshedCourseDetailList = data;
      this.activeCourses = this.refreshedCourseDetailList.activeCourses;
      this.inactiveCourses = this.refreshedCourseDetailList.inactiveCourses;

      this.showSuccess();
    });
  }

  changeTrainer(trainerid: any) {
    console.log(trainerid);
    this.changeCourseService.changeTrainer(this.memberId, trainerid).subscribe(data => {
      console.log(data), error => console.log(error)
      if (data) {
        this.trainerUpdated();
        this.telephone1 = '';
        this.telephone2 = '';
        this.trainerName = '';
        this.age = 0;
        this.email = '';
        this.nic = '';
        this.addressLine1 = '';
        this.addressLine2 = '';
        this.addressLine3 = '';
      } else {
        this.showError();
      }
    })
  }

  // Toastr
  showSuccess() {
    this.toastr.success('Course Changed', 'Successfully!',
      { timeOut: 3000 });;
  }
  showError() {
    this.toastr.error('Something Went Wrong!', 'Please check again',
      { timeOut: 4000 });
  }

  trainerUpdated() {
    this.toastr.success('Course Changed', 'Successfully!',
      { timeOut: 3000 });;
  }
}
