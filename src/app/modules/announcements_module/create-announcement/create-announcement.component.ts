import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Announcements } from 'src/app/classes/announcements';
import { AnnouncementServiceService } from '../announcement-service.service';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.scss']
})
export class CreateAnnouncementComponent implements OnInit {

  addAnnouncementForm: FormGroup;

  constructor(private announcementService: AnnouncementServiceService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.addAnnouncementForm = this.formBuilder.group({
      messageType: [null, [Validators.required]],
      message: [null, [Validators.required, Validators.minLength(2)]]
    });
  }


  get messageType() {
    return this.addAnnouncementForm.get("messageType");
  }

  get message() {
    return this.addAnnouncementForm.get("message");
  }

  onSubmit(announcement: Announcements) {
    announcement.lastEdit = sessionStorage.getItem('authenticatedUser');
    announcement.status = 'active';
    console.log(announcement);

    this.announcementService.saveAnnouncement(announcement).subscribe(data => {
      console.log(data), error => console.log(error);
      if (data) {
        this.showSuccess();
        this.addAnnouncementForm.reset();
      } else {
        this.showError();
      }
    });
  }

  // Toastr
  showSuccess() {
    this.toastr.success('New announcement has been', 'Published!',
      { timeOut: 3000 });;
  }
  showError() {
    this.toastr.error('Something Went Wrong!', 'Please check again',
      { timeOut: 4000 });
  }
}
