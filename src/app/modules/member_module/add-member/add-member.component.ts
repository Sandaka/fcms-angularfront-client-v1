import { Component, OnInit } from '@angular/core';
import { AddMemberService } from './add-member.service';
import { Course } from 'src/app/classes/course';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Trainer } from 'src/app/classes/trainer';
import { User } from 'src/app/classes/user';
import { MemberDetails } from 'src/app/classes/memberDetails';
import { ToastrService } from 'ngx-toastr';

// import * as jquery from 'jquery';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  courseList: Observable<Course[]>;
  courseObj: Course[] = [];

  courseNameList: Array<String> = [];
  adultAnnualFeeList: Array<number> = [];
  studentAnnualFeeList: Array<number> = [];
  adultMonthlyFeeList: Array<number> = [];
  studentMonthlyFeeList: Array<number> = [];
  courseIdList: Array<number> = [];

  addMemberForm: FormGroup;
  selectedCourseValues = [];
  selectedCourseError: Boolean = true;

  trainerList: Observable<Trainer[]>
  memberUserAccounts: Observable<User[]>

  isSuccess: boolean;

  //temp
  errorMsg: boolean;
  resultText = [];
  values: string;
  count: number = 0;
  fee: number;
  enteredAge: number;
  selectedCourse: Course;

  constructor(private addMemberService: AddMemberService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadTrainers();
    this.loadCourses();
    this.getUserAccounts();

    this.addMemberForm = this.formBuilder.group({
      fullName: [null, [Validators.required]],
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required]],
      addressLine1: [null, [Validators.required]],
      addressLine2: [null],
      addressLine3: [null],
      email: [null, [Validators.required, Validators.email]],
      telephone1: [null, [Validators.required, Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10)]],
      telephone2: [null, [Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10)]],
      nic: [null, [Validators.required, Validators.maxLength(10)]],
      gender: ['male', [Validators.required]],
      payby: [null, [Validators.required]],
      age: [null, [Validators.required]],
      trainerid: [null, [Validators.required]],
      netFee: [null, [Validators.required]],
      userName: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });

    // select2
    // jquery('.js-example-basic-single').select2();
  }

  loadCourses() {
    this.courseList = this.addMemberService.getAllCourses();
    // this.courseNameList=[];
    // this.addMemberService.getAllCourses().subscribe(obj => this.courseObj = obj.map(item => {
    //   this.courseNameList.push(item.coursename);
    //   this.adultAnnualFeeList.push(item.adultAnnualFee);
    //   this.adultMonthlyFeeList.push(item.adultMonthlyFee);
    //   this.studentAnnualFeeList.push(item.studentAnnualFee);
    //   this.studentMonthlyFeeList.push(item.studentMonthlyFee);
    //   this.courseIdList.push(item.courseid);
    //   console.log(this.courseNameList);
    // }))
    // console.log(this.courseNameList);

  }

  getUserAccounts() {
    this.addMemberService.loadMemberUserNames().subscribe(data => {
      this.memberUserAccounts = data;
    });
  }

  loadTrainers() {
    this.trainerList = this.addMemberService.getAlltrainers();
  }

  addCourseControls() {
    const arr = this.courseNameList.map(item => {
      return this.formBuilder.control(false);
    });
    return this.formBuilder.array(arr);
  }

  get coursesArray() {
    return <FormArray>this.addMemberForm.get('courses');
  }

  checkCourseControlsTouched() {
    let flg = false;
    this.coursesArray.controls.forEach(control => {
      if (control.touched) {
        flg = true;
      }
    });

    return flg;
  }

  getSelectedCourseValue() {
    this.selectedCourseValues = [];
    this.coursesArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedCourseValues.push(this.courseNameList[i]);
        console.log(this.selectedCourseValues);
      }
    });

    this.selectedCourseError = this.selectedCourseValues.length > 0 ? false : true;
  }


  checkBoxChange(course: Course, event) {
    this.errorMsg = false;
    const checked = event.target.checked;
    console.log(course);
    this.selectedCourse = course;

    if (checked) {
      this.resultText.push(course.coursename);
    } else {
      const index = this.resultText.indexOf(course.coursename);
      this.resultText.splice(index, 1);
    }

    this.values = this.resultText.toString();
    const count = this.resultText.length;
    this.count = count;
  }

  showFee(event: any) {
    if (this.enteredAge > 19) {
      if ("Annually" === event.target.value) {
        this.fee = this.selectedCourse.adultAnnualFee;
      } else {
        this.fee = this.selectedCourse.adultMonthlyFee;
      }
    } else {
      if ("Monthly" === event.target.value) {
        this.fee = this.selectedCourse.studentMonthlyFee;
      } else {
        this.fee = this.selectedCourse.studentAnnualFee;
      }
    }

  }
  getAge(event: any) {
    console.log("Age: " + event.target.value);
    this.enteredAge = event.target.value;
  }

  saveMember(memberDetails: MemberDetails) {
    console.log("saving method...");
    const courseCount = this.resultText.length;
    if (courseCount == 0) {
      this.errorMsg = true;
      // alert(this.errorMsg);
    } else {
      console.log(this.resultText);
      this.count = courseCount;
      memberDetails.lastEdit = sessionStorage.getItem('authenticatedUser');
      memberDetails.courseList = this.resultText;

      this.addMemberService.saveMemberDetails(memberDetails).subscribe(data => {
        console.log(data), error => console.log(error)
        if (data) {
          this.showSuccess();
        } else {
          this.showError();
        }

      });
    }
  }



  // requested values from form
  get fullName() {
    return this.addMemberForm.get('fullName');
  }

  get firstName() {
    return this.addMemberForm.get("firstName");
  }

  get lastName() {
    return this.addMemberForm.get("lastName");
  }

  get addressLine1() {
    return this.addMemberForm.get("addressLine1");
  }

  get telephone1() {
    return this.addMemberForm.get("telephone1");
  }

  get telephone2() {
    return this.addMemberForm.get("telephone2");
  }

  get nic() {
    return this.addMemberForm.get("nic");
  }

  get gender() {
    return this.addMemberForm.get("gender");
  }

  get email() {
    return this.addMemberForm.get("email");
  }

  get payby() {
    return this.addMemberForm.get("payby");
  }
  // get userid() {
  //   return this.addMemberForm.get("userid");
  // }
  get trainerid() {
    return this.addMemberForm.get("trainerid");
  }

  get netFee() {
    return this.addMemberForm.get("netFee");
  }
  get age() {
    return this.addMemberForm.get("age");
  }
  get userName() {
    return this.addMemberForm.get("userName");
  }
  get password() {
    return this.addMemberForm.get("password");
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