import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Guideline } from 'src/app/classes/Guideline';
import { ApproveGuidelineService } from './approve-guideline.service';

@Component({
  selector: 'app-approve-guideline',
  templateUrl: './approve-guideline.component.html',
  styleUrls: ['./approve-guideline.component.scss']
})
export class ApproveGuidelineComponent implements OnInit {

  guidelineList: Observable<Guideline[]>;
  guidelineObj: Guideline;
  base64Data: any;
  new_guidelineList: Guideline[] = [];
  new_guidelineObj: Guideline;
  status_only: Guideline;

  constructor(private approveGuidelineService: ApproveGuidelineService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadPendingList();
  }

  loadPendingList() {
    console.log("running...")
    this.approveGuidelineService.getPendingGuidelines().subscribe(data => {
      // console.log(data);
      this.guidelineList = data;

      data.forEach(element => {
        this.guidelineObj = element;

        // console.log(this.guidelineObj.workoutId);

        this.new_guidelineObj = new Guideline;
        this.base64Data = element.imagepath;
        this.new_guidelineObj.imagepath = 'data:image/jpeg;base64,' + this.base64Data;
        this.new_guidelineObj.guidelineId = this.guidelineObj.guidelineId;
        this.new_guidelineObj.name = this.guidelineObj.name;
        this.new_guidelineObj.lastEdit = this.guidelineObj.lastEdit;

        // console.log(this.new_guidelineObj.imagepath);

        this.new_guidelineList.push(this.new_guidelineObj)
        // this.new_guidelineList.pipe(tap(list => {
        //   list.push(this.new_guidelineObj);
        // }));
      });
    });
  }

  approveGuideline(guidelineid: string) {
    // const json = '{ "status": "active"}';
    // const obj = JSON.parse(json);
    this.status_only = new Guideline;
    this.status_only.status = "active";
    this.approveGuidelineService.activate(guidelineid, this.status_only).subscribe(data => {
      console.log(data), error => console.log(error)
      if (data) {
        this.showSuccessActivate();
      } else {
        this.showErrorActivate();
      }

    });

    this.showSuccessActivate();
  }


  // Toastr
  showSuccessActivate() {
    this.toastr.success('Guideline has been inactivated', 'Successfully!',
      { timeOut: 3000 });;
  }
  showErrorActivate() {
    this.toastr.error('Something Went Wrong!', 'Please check again',
      { timeOut: 4000 });
  }
}
