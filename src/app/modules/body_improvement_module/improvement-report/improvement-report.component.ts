import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { CreateScheduleService } from '../../workout_module/create-schedule/create-schedule.service';
import { MemberForSchedule } from 'src/app/classes/save-schedule/memberForSchedule';
import { Observable } from 'rxjs';
import { ImprovementReportService } from './improvement-report.service';
import { MemberScheduleDetail } from 'src/app/classes/view-schedule/memberScheduleDetail';
import { ToastrService } from 'ngx-toastr';
import { BodyImprovementsReport } from 'src/app/classes/bodyImprovementsReport';

@Component({
  selector: 'app-improvement-report',
  templateUrl: './improvement-report.component.html',
  styleUrls: ['./improvement-report.component.scss']
})
export class ImprovementReportComponent implements OnInit {

  memberList: Observable<MemberForSchedule[]>;
  scheduleList: Observable<MemberScheduleDetail[]>;
  schedule1: any;
  schedule2: any;
  improvementsList: Observable<BodyImprovementsReport[]>;
  improvementOb1: BodyImprovementsReport;
  improvementOb2: BodyImprovementsReport;
  dataAvailable: boolean = false;

  constructor(private scheduleService: CreateScheduleService, private improvementReportService: ImprovementReportService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.scheduleService.getAllMembers().subscribe(data => {
      this.memberList = data;
    });
  }

  findSchedules(memberId: number) {
    console.log("memberid: " + memberId);

    this.improvementReportService.getSchedulesByMemberId(memberId).subscribe(data => {
      this.scheduleList = data;
    });
  }

  getSchedule1(scheduleId1: any) {
    this.schedule1 = scheduleId1;
  }

  getSchedule2(scheduleId2: any) {
    this.schedule2 = scheduleId2;
  }

  loadReports() {
    console.log("comparing schedules: " + this.schedule1 + " " + this.schedule2);

    if (this.schedule1 === undefined || this.schedule2 === undefined) {
      this.noSchedule();
    } else {
      if (this.schedule2 === this.schedule1) {
        this.selectDifferentSchedules();
      } else {
        this.improvementReportService.getImprovemtnsByScheduleId(this.schedule1, this.schedule2).subscribe(data => {
          this.improvementsList = data;

          this.dataAvailable = true;

          this.improvementOb1 = this.improvementsList[0];
          console.log(this.improvementOb1);

          this.improvementOb2 = this.improvementsList[1];

          var absReport = new Chart("absReport2", {
            type: 'doughnut',
            data: {
              labels: ['Schedule ' + this.improvementOb1.scheduleNumber, 'Schedule ' + this.improvementOb2.scheduleNumber],
              datasets: [{
                label: 'ABS',
                data: [this.improvementOb1.abs, this.improvementOb2.abs],
                backgroundColor: [
                  'rgba(237, 114, 114, 1)',
                  'rgba(56, 2, 2, 1)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(56, 2, 2, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });

          // bycep tricep
          var bycepReport = new Chart("bycepReport2", {
            type: 'doughnut',
            data: {
              labels: ['Schedule ' + this.improvementOb1.scheduleNumber, 'Schedule ' + this.improvementOb2.scheduleNumber],
              datasets: [{
                label: 'Bycep/Tricep',
                data: [this.improvementOb1.bycepAndTricep, this.improvementOb2.bycepAndTricep],
                backgroundColor: [
                  'rgba(116, 130, 237, 1)',
                  'rgba(4, 12, 74, 1)'
                ],
                borderColor: [
                  'rgba(116, 130, 237, 1)',
                  'rgba(4, 12, 74, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });

          // calves
          var calvesReport = new Chart("calvesReport2", {
            type: 'doughnut',
            data: {
              labels: ['Schedule ' + this.improvementOb1.scheduleNumber, 'Schedule ' + this.improvementOb2.scheduleNumber],
              datasets: [{
                label: 'calves',
                data: [this.improvementOb1.calves, this.improvementOb2.calves],
                backgroundColor: [
                  'rgba(104, 202, 232, 1)',
                  'rgba(4, 69, 89, 1)'
                ],
                borderColor: [
                  'rgba(104, 202, 232, 1)',
                  'rgba(4, 69, 89, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });

          // chest
          var chestReport = new Chart("chestReport2", {
            type: 'doughnut',
            data: {
              labels: ['Schedule ' + this.improvementOb1.scheduleNumber, 'Schedule ' + this.improvementOb2.scheduleNumber],
              datasets: [{
                label: 'chest',
                data: [this.improvementOb1.chest, this.improvementOb2.chest],
                backgroundColor: [
                  'rgba(113, 232, 111, 1)',
                  'rgba(4, 66, 3, 1)'
                ],
                borderColor: [
                  'rgba(113, 232, 111, 1)',
                  'rgba(4, 66, 3, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });

          // forearms
          var forearmsReport = new Chart("forearmsReport2", {
            type: 'doughnut',
            data: {
              labels: ['Schedule ' + this.improvementOb1.scheduleNumber, 'Schedule ' + this.improvementOb2.scheduleNumber],
              datasets: [{
                label: 'forearms',
                data: [this.improvementOb1.forearms, this.improvementOb2.forearms],
                backgroundColor: [
                  'rgba(240, 185, 129, 1)',
                  'rgba(99, 52, 5, 1)'
                ],
                borderColor: [
                  'rgba(240, 185, 129, 1)',
                  'rgba(99, 52, 5, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });


          // shoulders
          var shouldersReport = new Chart("shouldersReport2", {
            type: 'doughnut',
            data: {
              labels: ['Schedule ' + this.improvementOb1.scheduleNumber, 'Schedule ' + this.improvementOb2.scheduleNumber],
              datasets: [{
                label: 'shoulders',
                data: [this.improvementOb1.shoulders, this.improvementOb2.shoulders],
                backgroundColor: [
                  'rgba(190, 134, 240, 1)',
                  'rgba(51, 5, 92, 1)'
                ],
                borderColor: [
                  'rgba(190, 134, 240, 1)',
                  'rgba(51, 5, 92, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });


        });
      }
    }
  }

  //// CHART
  // public barChartOptions: any = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };

  // public mbarChartLabels: string[] = ['2012', '2013', '2014', '2015', '2016', '2017', '2018'];
  // public barChartType: string = 'bar';
  // public barChartLegend: boolean = true;

  // public barChartColors: Array<any> = [
  //   {
  //     backgroundColor: 'rgba(105,159,177,0.2)',
  //     borderColor: 'rgba(105,159,177,1)',
  //     pointBackgroundColor: 'rgba(105,159,177,1)',
  //     pointBorderColor: '#fafafa',
  //     pointHoverBackgroundColor: '#fafafa',
  //     pointHoverBorderColor: 'rgba(105,159,177)'
  //   },
  //   {
  //     backgroundColor: 'rgba(77,20,96,0.3)',
  //     borderColor: 'rgba(77,20,96,1)',
  //     pointBackgroundColor: 'rgba(77,20,96,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(77,20,96,1)'
  //   }
  // ];
  // public barChartData: any[] = [
  //   { data: [55, 60, 75, 82, 56, 62, 80], label: 'Company A' },
  //   { data: [58, 55, 60, 79, 66, 57, 900], label: 'Company B' }
  // ];

  // // events
  // public chartClicked(e: any): void {
  //   console.log(e);
  // }

  // public chartHovered(e: any): void {
  //   console.log(e);
  // }

  // public randomize(): void {
  //   let data = [
  //     Math.round(Math.random() * 100),
  //     Math.round(Math.random() * 100),
  //     Math.round(Math.random() * 100),
  //     (Math.random() * 100),
  //     Math.round(Math.random() * 100),
  //     (Math.random() * 100),
  //     Math.round(Math.random() * 100)];
  //   let clone = JSON.parse(JSON.stringify(this.barChartData));
  //   clone[0].data = data;
  //   this.barChartData = clone;
  // }


  // Toastr
  noSchedule() {
    this.toastr.warning('Please select schedules first', 'Error!',
      { timeOut: 3000 });;
  }

  selectDifferentSchedules() {
    this.toastr.warning('Please select different schedules', 'Warning!',
      { timeOut: 3000 });;
  }
}
