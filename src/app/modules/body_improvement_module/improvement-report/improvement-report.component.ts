import { Component, OnInit } from '@angular/core';
import { CreateScheduleService } from '../../workout_module/create-schedule/create-schedule.service';
import { MemberForSchedule } from 'src/app/classes/save-schedule/memberForSchedule';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-improvement-report',
  templateUrl: './improvement-report.component.html',
  styleUrls: ['./improvement-report.component.scss']
})
export class ImprovementReportComponent implements OnInit {

  memberList: Observable<MemberForSchedule[]>;

  constructor(private scheduleService: CreateScheduleService) { }

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.scheduleService.getAllMembers().subscribe(data => {
      this.memberList = data;
    });
  }

  findSchedules(memberRegId: number) {
    console.log("memberregid: " + memberRegId);
    // get schedule list of selected member
    // this.adminViewScheduleService.getAssignedSchedules(memberId).subscribe(data => {
    //   this.scheduleList = data;
    // })
  }

  // CHART
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public mbarChartLabels: string[] = ['2012', '2013', '2014', '2015', '2016', '2017', '2018'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105,159,177,0.2)',
      borderColor: 'rgba(105,159,177,1)',
      pointBackgroundColor: 'rgba(105,159,177,1)',
      pointBorderColor: '#fafafa',
      pointHoverBackgroundColor: '#fafafa',
      pointHoverBorderColor: 'rgba(105,159,177)'
    },
    {
      backgroundColor: 'rgba(77,20,96,0.3)',
      borderColor: 'rgba(77,20,96,1)',
      pointBackgroundColor: 'rgba(77,20,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,20,96,1)'
    }
  ];
  public barChartData: any[] = [
    { data: [55, 60, 75, 82, 56, 62, 80], label: 'Company A' },
    { data: [58, 55, 60, 79, 66, 57, 900], label: 'Company B' }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
    let data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      (Math.random() * 100),
      Math.round(Math.random() * 100),
      (Math.random() * 100),
      Math.round(Math.random() * 100)];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }
}
