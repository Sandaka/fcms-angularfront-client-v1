import { Component, OnInit } from '@angular/core';
import { AddTrainerService } from './add-trainer.service';
import { Observable, of } from 'rxjs';
import { TrainerSpec } from 'src/app/classes/trainerSpec';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { User } from 'src/app/classes/user';
import { Trainer } from 'src/app/classes/trainer';
import { TrainerDetails } from 'src/app/classes/trainerDetails';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.scss']
})
export class AddTrainerComponent implements OnInit {

  // specList: Array<TrainerSpec[]>;
  specList: Array<String> = ['Body Fitness']
  // public specList: Array<string>;
  addTrainerForm: FormGroup;
  selectedSpecValues = [];
  selectedSpecError: Boolean = true;

  existingUserList: User[];
  existUser: User;
  userNameExists: boolean = false;
  trainerDetails: TrainerDetails = new TrainerDetails();

  constructor(private addTrainerService: AddTrainerService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    
    this.addTrainerForm = this.formBuilder.group({
      t_specs: this.addTrainerSpecControls(),
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
      salary: [null],
      userName: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });

    this.addValidator();
    this.initializeUserName();
  }

  addValidator() {
    this.addTrainerForm.controls['userName'].setAsyncValidators([this.isValidName(), this.isValidNameNotInList()]);
  }

  getTrainerSpecsList() {
    // this.specList = [];
    this.addTrainerService.loadTrainersSpecs().subscribe(data => {
      this.specList = data;
      console.log("getTrainerSpecsList");
    });
    console.log(this.specList);
    // return this.specList;
  }

  initializeUserName() {
    this.addTrainerService.getAllUsers().subscribe(data => {
      this.existingUserList = data;
    });
  }

  isValidName(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      let bReturn: boolean = true;
      if (this.addTrainerForm.controls['userName'].value == '') {
        bReturn = false;
      }
      let err: ValidationErrors = { 'invalid': true };
      return bReturn ? of(null) : of(err);
    };
  }

  isValidNameNotInList(): AsyncValidatorFn {

    return (control: AbstractControl): Observable<ValidationErrors> => {
      let bReturn: boolean = true;

      for (let i = 0; i < this.existingUserList.length; i++) {
        this.existUser = this.existingUserList[i];
        //console.log("existing users: " + this.addMemberForm.controls['userName'].value + " --> " + this.existUser.username);
        if (this.addTrainerForm.controls['userName'].value == this.existUser.username) {
          console.log("user names are equal...");
          // this.existUserName = this.existUser.username
          this.userNameExists = true;
          break;
        } else {
          this.userNameExists = false;
        }
      }

      if (this.userNameExists) {
        bReturn = false;
      }
      let err: ValidationErrors = { 'exists': true };
      return bReturn ? of(null) : of(err);
    };
  }

  addTrainerSpecControls() {
    const arr = this.specList.map(item => {
      return this.formBuilder.control(false);
    });
    return this.formBuilder.array(arr);
  }

  get specsArray() {
    return <FormArray>this.addTrainerForm.get('t_specs');
  }

  checkSpecControlsTouched() {
    let flg = false;
    this.specsArray.controls.forEach(control => {
      if (control.touched) {
        flg = true;
      }
    });

    return flg;
  }

  getSelectedSpecValue() {
    this.selectedSpecValues = [];
    this.specsArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedSpecValues.push(this.specList[i]);
        console.log(this.selectedSpecValues);
      }
    });

    this.selectedSpecError = this.selectedSpecValues.length > 0 ? false : true;
  }

  //Saving method
  saveTrainer(trainer: TrainerDetails) {
    console.log("saving part goes here..." + this.selectedSpecValues);
    trainer.specialityList = this.selectedSpecValues;
    trainer.lastEdit = sessionStorage.getItem('authenticatedUser');
    this.addTrainerService.saveTrainerDetails(trainer).subscribe(data => {
      console.log(data), error => console.log(error)
      if (data) {
        this.showSuccess();
        this.addTrainerForm.reset();
      } else {
        this.showError();
      }
    });
  }

  // requested values from form
  get fullName() {
    return this.addTrainerForm.get('fullName');
  }

  get firstName() {
    return this.addTrainerForm.get("firstName");
  }

  get lastName() {
    return this.addTrainerForm.get("lastName");
  }

  get addressLine1() {
    return this.addTrainerForm.get("addressLine1");
  }

  get telephone1() {
    return this.addTrainerForm.get("telephone1");
  }

  get telephone2() {
    return this.addTrainerForm.get("telephone2");
  }

  get nic() {
    return this.addTrainerForm.get("nic");
  }

  get gender() {
    return this.addTrainerForm.get("gender");
  }

  get email() {
    return this.addTrainerForm.get("email");
  }

  get userName() {
    return this.addTrainerForm.get("userName");
  }

  get password() {
    return this.addTrainerForm.get("password");
  }


  // Toastr
  showSuccess() {
    this.toastr.success('New Trainer Added', 'Successfully!',
      { timeOut: 3000 });;
  }
  showError() {
    this.toastr.error('Something Went Wrong!', 'Please check again',
      { timeOut: 4000 });
  }
}
