import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { stat } from 'fs';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'src/app/classes/user';
import { AdminUpdateUserService } from './admin-update-user.service';

@Component({
  selector: 'app-admin-update-user',
  templateUrl: './admin-update-user.component.html',
  styleUrls: ['./admin-update-user.component.scss']
})
export class AdminUpdateUserComponent implements OnInit {

  //usersList: Observable<User[]>;
  usersList: User[] = [];
  adminUpdateUserForm: FormGroup;
  conf_username: any = "";
  conf_userid: any = "";
  conf_status: any = "";
  statusUpdatedUser: User;

  userName: any;
  p: number = 1;

  constructor(private adminUpdateUserService: AdminUpdateUserService, private modalService: NgbModal, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadAllUsers();
    this.adminUpdateUserForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      userid: [null],
      userRoleName: [null],
      status: [null]
    });
  }

  search() {
    if (this.userName == "") {
      this.ngOnInit();
    } else {
      this.usersList = this.usersList.filter(resonse => {
        return resonse.username.toLocaleLowerCase().match(this.userName.toLocaleLowerCase());
      });
    }
  }

  loadAllUsers() {
    this.adminUpdateUserService.getAllUsers().subscribe(data => {
      this.usersList = data;
    });
  }

  adminUpdateUser(userData: User) {
    console.log(userData.username);
    userData.lastEdit = sessionStorage.getItem('authenticatedUser');
    this.adminUpdateUserService.updateUser(userData.userid, userData).subscribe(data => {
      console.log(data), error => console.log(error)
      if (data) {
        this.showUpdateSuccess();
        this.loadAllUsers();
        this.closeModal("adminEditUserModal")
      } else {
        this.showError();
      }
    });
  }

  getConfirmation(targetModal, user) {
    console.log("confirmation...");
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
      // size: "xl"
    });

    console.log(user.username);
    this.conf_userid = user.userid;
    this.conf_username = user.username;
    this.conf_status = user.status;
  }

  updateStatus(userId: any, status: any) {
    this.statusUpdatedUser = new User();
    this.statusUpdatedUser.userid = userId;
    this.statusUpdatedUser.lastEdit = sessionStorage.getItem('authenticatedUser');
    console.log(userId + " " + status);

    if (status === 'active') {
      this.statusUpdatedUser.status = "inactive";
    } else {
      this.statusUpdatedUser.status = "active";
    }

    this.adminUpdateUserService.changeStatus(userId, this.statusUpdatedUser).subscribe(data => {
      console.log(data), error => console.log(error)
      if (data) {
        this.closeModal("confirmationModal");
        this.showSuccess();
        this.loadAllUsers();
      } else {
        this.showError();
      }
    });
  }

  // for update modal
  openEditModal(targetModal, user) {
    console.log("update modal method..." + user.status);
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
      // size: "xl"
    });

    this.adminUpdateUserForm.patchValue({
      username: user.username,
      userid: user.userid,
      password: user.password,
      userRoleName: user.userRoleName,
      status: user.status

    });
  }

  closeModal(targetModal) {
    this.modalService.dismissAll(targetModal)
  }

  // Toastr
  showSuccess() {
    this.toastr.success('User updated', 'Successfully!',
      { timeOut: 3000 });;
  }

  showError() {
    this.toastr.error('Something Went Wrong!', 'Please check again',
      { timeOut: 4000 });
  }

  showUpdateSuccess() {
    this.toastr.success('Workout  has been Updated', 'Successfully!',
      { timeOut: 3000 });;
  }


  get username() {
    return this.adminUpdateUserForm.get("username");
  }

  get password() {
    return this.adminUpdateUserForm.get("password");
  }

  get userRoleName() {
    return this.adminUpdateUserForm.get("userRoleName");
  }

  get status() {
    return this.adminUpdateUserForm.get("status");
  }

  get userid() {
    return this.adminUpdateUserForm.get("userid");
  }

}
