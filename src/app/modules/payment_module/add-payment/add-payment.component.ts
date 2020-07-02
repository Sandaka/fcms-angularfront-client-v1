import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/classes/member';
import { MemberCourseDetails } from 'src/app/classes/memberCourseDetails';
import { AddPaymentService } from './add-payment.service';
import { element } from 'protractor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FeePayment } from 'src/app/classes/feePayment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {

  memberList: Observable<Member[]>;
  courseDetails: Observable<MemberCourseDetails[]>;
  netFee: string = "";
  payby: string = "";
  regDate: string = "";
  memberCourseDetails: MemberCourseDetails;

  addPaymentForm: FormGroup;

  constructor(private addPaymentService: AddPaymentService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadMembers();
    this.addPaymentForm = this.formBuilder.group({
      memberId: [null, [Validators.required]],
      forMonth: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.pattern(/^\d+(?:\.\d{0,2})$/)]],
      status: [null]
    });
  }

  loadMembers() {
    this.addPaymentService.getAllMembers().subscribe(data => {
      this.memberList = data;
    });
  }

  findCourseDetails(memberId: number) {
    console.log("memberid: " + memberId);
    this.addPaymentService.getCourseDetails(memberId).subscribe(data => {
      console.log(data);
      this.courseDetails = data;

      data.forEach(element => {
        this.memberCourseDetails = element;
        console.log(this.memberCourseDetails.netFee)
        this.netFee = this.memberCourseDetails.netFee;
        this.payby = this.memberCourseDetails.payby;
        this.regDate = this.memberCourseDetails.regDate;
      });
    });
  }

  savePayment(feePayment: FeePayment) {
    // console.log(feePayment.amount);
    feePayment.lastEdit = sessionStorage.getItem('authenticatedUser');
    this.addPaymentService.savePayment(feePayment).subscribe(data => {
      console.log(data), error => console.log(error)
      if (data) {
        this.showSuccess();
      } else {
        this.showError();
      }

    });
  }

  get memberId() {
    return this.addPaymentForm.get("memberId");
  }

  get forMonth() {
    return this.addPaymentForm.get("forMonth");
  }

  get amount() {
    return this.addPaymentForm.get("amount");
  }

  get status() {
    return this.addPaymentForm.get("status");
  }


  // Toastr
  showSuccess() {
    this.toastr.success('Payment Added', 'Successfully!',
      { timeOut: 3000 });;
  }
  showError() {
    this.toastr.error('Something Went Wrong!', 'Please check again',
      { timeOut: 4000 });
  }
}
