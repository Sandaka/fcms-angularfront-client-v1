import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Trainer } from 'src/app/classes/trainer';
import { TrainerDetails } from 'src/app/classes/trainerDetails';
import { TrainerUpdateProfileService } from './trainer-update-profile.service';

@Component({
  selector: 'app-trainer-update-profile',
  templateUrl: './trainer-update-profile.component.html',
  styleUrls: ['./trainer-update-profile.component.scss']
})
export class TrainerUpdateProfileComponent implements OnInit {

  updateTrainerForm: FormGroup;
  errorMsg: boolean;
  userId: string;
  trainerDetail: Trainer;
  trainerId: string;

  constructor(private updateTrainerService: TrainerUpdateProfileService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {

    this.loggedTrainerDetails();

    this.updateTrainerForm = this.formBuilder.group({
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
      gender: [null, [Validators.required]]
    });
  }

  loggedTrainerDetails() {
    this.trainerId = sessionStorage.getItem('trainerId');
    this.updateTrainerService.getTrainerDetailsById(this.trainerId).subscribe(data => {
      // this.memberDetail = new Member;
      this.trainerDetail = data;

      //this.memberId = this.memberDetail.memberid;
      console.log("trainer Id " + this.trainerId);
      console.log(data);

      this.updateTrainerForm.setValue({
        fullName: this.trainerDetail.fullName,
        firstName: this.trainerDetail.firstName,
        lastName: this.trainerDetail.lastName,
        addressLine1: this.trainerDetail.addressLine1,
        addressLine2: this.trainerDetail.addressLine2,
        addressLine3: this.trainerDetail.addressLine3,
        email: this.trainerDetail.email,
        telephone1: this.trainerDetail.telephone1,
        telephone2: this.trainerDetail.telephone2,
        nic: this.trainerDetail.nic,
        gender: this.trainerDetail.gender

      });
    });
  }

  updateTrainer(trainerDetails: Trainer) {
    trainerDetails.lastEdit = sessionStorage.getItem('authenticatedUser');
    trainerDetails.status = "active";
    trainerDetails.trainerid = this.trainerId;
    console.log("--- update " + trainerDetails.trainerid);

    this.updateTrainerService.updateTrainer(this.trainerId, trainerDetails).subscribe(data => {
      this.showSuccess();
      this.updateTrainerForm.reset();
    }, error => {
      this.showError();
    });
  }

  // requested values from form
  get fullName() {
    return this.updateTrainerForm.get('fullName');
  }

  get firstName() {
    return this.updateTrainerForm.get("firstName");
  }

  get lastName() {
    return this.updateTrainerForm.get("lastName");
  }

  get addressLine1() {
    return this.updateTrainerForm.get("addressLine1");
  }

  get telephone1() {
    return this.updateTrainerForm.get("telephone1");
  }

  get telephone2() {
    return this.updateTrainerForm.get("telephone2");
  }

  get nic() {
    return this.updateTrainerForm.get("nic");
  }

  get gender() {
    return this.updateTrainerForm.get("gender");
  }

  get email() {
    return this.updateTrainerForm.get("email");
  }


  // Toastr
  showSuccess() {
    this.toastr.success('Trainer details updated', 'Successfully!',
      { timeOut: 3000 });;
  }
  showError() {
    this.toastr.error('Something Went Wrong!', 'Please check again',
      { timeOut: 4000 });
  }
}
