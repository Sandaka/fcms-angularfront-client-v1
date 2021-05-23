import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Announcements } from 'src/app/classes/announcements';
import { AnnouncementServiceService } from '../announcement-service.service';

@Component({
  selector: 'app-view-announcement',
  templateUrl: './view-announcement.component.html',
  styleUrls: ['./view-announcement.component.scss']
})
export class ViewAnnouncementComponent implements OnInit {

  announcementList: Observable<Announcements[]>;

  constructor(private announcementService: AnnouncementServiceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.announcementService.loadAnnouncements().subscribe(data => {
      console.log(data), error => console.log(error);
      if (data) {
        this.announcementList = data;
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
    this.toastr.warning('No recent announcements!', '',
      { timeOut: 3000 });
  }
}
