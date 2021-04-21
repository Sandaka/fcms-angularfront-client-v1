import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/classes/user';
import { LoginService } from '../login/login/login.service';
import { ChangePasswordService } from './change-password.service';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public frmSignup: FormGroup;
  userObj: User;
  loggedUserId: any;

  constructor(private fb: FormBuilder, private changePasswordService: ChangePasswordService, private toastr: ToastrService, private router: Router, private loginService: LoginService) {
    this.frmSignup = this.createSignupForm();
  }

  ngOnInit() {
    this.loggedUserId = sessionStorage.getItem("userId");
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        // email: [
        //   null,
        //   Validators.compose([Validators.email, Validators.required])
        // ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(8)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  submit() {
    console.log(this.frmSignup.value);
    this.userObj = new User();
    this.userObj.lastEdit = sessionStorage.getItem('authenticatedUser');
    this.userObj.password = this.frmSignup.value.confirmPassword;

    this.changePasswordService.updatePassword(this.loggedUserId, this.userObj).subscribe(data => {
      console.log(data), error => console.log(error)
      if (data) {
        this.showSuccess();
        this.frmSignup.reset();
        this.loginWithNewPassword();
      } else {
        this.showError();
      }
    });
  }

  // Toastr
  showSuccess() {
    this.toastr.success('Please Login again with new password', 'Your Password Changed!',
      { timeOut: 5000 });;
  }
  showError() {
    this.toastr.error('Something Went Wrong!', 'Please check again',
      { timeOut: 4000 });
  }

  loginWithNewPassword() {
    this.router.navigate(['/login']);
    return this.loginService.logout();
  }
}
