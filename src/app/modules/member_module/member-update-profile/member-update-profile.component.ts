import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/classes/member';
import { MemberDetails } from 'src/app/classes/memberDetails';
import { MemberUpdateProfileService } from './member-update-profile.service';

@Component({
  selector: 'app-member-update-profile',
  templateUrl: './member-update-profile.component.html',
  styleUrls: ['./member-update-profile.component.scss']
})
export class MemberUpdateProfileComponent implements OnInit {

  updateMemberForm: FormGroup;
  errorMsg: boolean;
  userId: string;
  memberDetail: Member;
  traineridObj: any;
  memberId: number;

  constructor(private updateMemberService: MemberUpdateProfileService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {

    this.loggedMemberDetails();

    this.updateMemberForm = this.formBuilder.group({
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
      gender: [null, [Validators.required]],
      trainerid: [null]
    });
  }

  loggedMemberDetails() {
    this.userId = sessionStorage.getItem('userId');
    this.updateMemberService.getMemberDetails2(this.userId).subscribe(data => {
      // this.memberDetail = new Member;
      this.memberDetail = data;

      this.traineridObj = this.memberDetail.trainerid;
      this.memberId = this.memberDetail.memberid;
      console.log("member Id " + this.memberId);

      this.updateMemberForm.setValue({
        fullName: this.memberDetail.fullName,
        firstName: this.memberDetail.firstName,
        lastName: this.memberDetail.lastName,
        addressLine1: this.memberDetail.addressLine1,
        addressLine2: this.memberDetail.addressLine2,
        addressLine3: this.memberDetail.addressLine3,
        email: this.memberDetail.email,
        telephone1: this.memberDetail.telephone1,
        telephone2: this.memberDetail.telephone2,
        nic: this.memberDetail.nic,
        gender: this.memberDetail.gender,
        trainerid: this.memberDetail.trainerid
      });
    });
  }

  updateMember(memberDetails: MemberDetails) {
    memberDetails.lastEdit = sessionStorage.getItem('authenticatedUser');
    memberDetails.trainerid = this.traineridObj;
    memberDetails.status = "active"
    console.log("--- update " + this.memberDetail.trainerid);

    this.updateMemberService.updateMember(this.memberId, memberDetails).subscribe(data => {
      this.showSuccess();
    }, error => {
      this.showError();
    });
  }

  // requested values from form
  get fullName() {
    return this.updateMemberForm.get('fullName');
  }

  get firstName() {
    return this.updateMemberForm.get("firstName");
  }

  get lastName() {
    return this.updateMemberForm.get("lastName");
  }

  get addressLine1() {
    return this.updateMemberForm.get("addressLine1");
  }

  get telephone1() {
    return this.updateMemberForm.get("telephone1");
  }

  get telephone2() {
    return this.updateMemberForm.get("telephone2");
  }

  get nic() {
    return this.updateMemberForm.get("nic");
  }

  get gender() {
    return this.updateMemberForm.get("gender");
  }

  get email() {
    return this.updateMemberForm.get("email");
  }

  get trainerid() {
    return this.updateMemberForm.get("trainerid");
  }


  // Toastr
  showSuccess() {
    this.toastr.success('Member details updated', 'Successfully!',
      { timeOut: 3000 });;
  }
  showError() {
    this.toastr.error('Something Went Wrong!', 'Please check again',
      { timeOut: 4000 });
  }
}
