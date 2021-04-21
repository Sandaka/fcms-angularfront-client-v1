import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  usersList: Observable<User[]>;
  adminUpdateUserForm: FormGroup;

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

  loadAllUsers(){
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

  // for update modal
  openEditModal(targetModal, user) {
    console.log("update modal method..."+user.status);
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
    this.toastr.success('New Workout Added', 'Successfully!',
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
