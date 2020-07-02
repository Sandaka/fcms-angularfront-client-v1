import { Component, OnInit } from '@angular/core';
import { CreateUserService } from './create-user.service';
import { Userrole } from 'src/app/classes/userrole';
import { Observable } from 'rxjs';
import { User } from 'src/app/classes/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  // userRoles: Array<any>;
  userRoles: Observable<Userrole[]>;
  userNameAvailable: false;
  formSubmitted = false;

  addUserForm: FormGroup;

  // user: User = new User();

  constructor(private createUserService: CreateUserService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadUserRoleList();
    this.addUserForm = this.formBuilder.group({
      userroleid: [null, [Validators.required]],
      username: [null, [Validators.required, Validators.minLength(2)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
    });
  }

  loadUserRoleList() {
    this.createUserService.getUserRoleList().subscribe(data => {
      this.userRoles = data;
    });
  }

  findUserNameExists(userName: string) {
    console.log(userName);
    this.createUserService.findUserNameExists(userName).subscribe(data => {
      this.userNameAvailable = data;
      console.log("=== " + this.userNameAvailable);

    });
  }

  get userroleid() {
    return this.addUserForm.get("userroleid");
  }

  get password() {
    return this.addUserForm.get("password");
  }

  get username() {
    return this.addUserForm.get("username");
  }

  // save() {
  //   console.log(this.user.userroleid);
  //   this.user.status = "active";
  //   this.user.lastEdit = "sandaka";
  //   this.createUserService.createNewUser(this.user).subscribe(data => console.log(data), error => console.log(error));
  //   this.user = new User();
  // }
  onSubmit(user: User) {
    user.lastEdit = sessionStorage.getItem('authenticatedUser');
    user.status = "active";
    console.log(user.username);
    console.log(user.password);
    console.log(user.userroleid);
    this.createUserService.createNewUser(user).subscribe(data => {
      console.log(data), error => console.log(error)
      if (data) {
        this.showSuccess();
      } else {
        this.showError();
      }
    });
    // this.formSubmitted = true;
    // this.save();
  }


  // Toastr
  showSuccess() {
    this.toastr.success('New User Added', 'Successfully!',
      { timeOut: 3000 });;
  }
  showError() {
    this.toastr.error('Something Went Wrong!', 'Please check again',
      { timeOut: 4000 });
  }

}
