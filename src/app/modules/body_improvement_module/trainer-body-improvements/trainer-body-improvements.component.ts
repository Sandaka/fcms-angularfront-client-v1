import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'node_modules/chart.js';
import { Observable } from 'rxjs';
import { BodyImprovementsReport } from 'src/app/classes/bodyImprovementsReport';
import { MemberForSchedule } from 'src/app/classes/save-schedule/memberForSchedule';
import { MemberScheduleDetail } from 'src/app/classes/view-schedule/memberScheduleDetail';
import { TrainerBodyImprovementsService } from './trainer-body-improvements.service';

@Component({
  selector: 'app-trainer-body-improvements',
  templateUrl: './trainer-body-improvements.component.html',
  styleUrls: ['./trainer-body-improvements.component.scss']
})
export class TrainerBodyImprovementsComponent implements OnInit {
  trainerMemberList: Observable<MemberForSchedule[]>;
  scheduleList: Observable<MemberScheduleDetail[]>;
  schedule1: any;
  schedule2: any;
  improvementsList: Observable<BodyImprovementsReport[]>;
  improvementOb1: BodyImprovementsReport;
  improvementOb2: BodyImprovementsReport;
  dataAvailable: boolean = false;

  trainerId: any;

  constructor(private improvementReportService: TrainerBodyImprovementsService, private toastr: ToastrService) { }

  ngOnInit() {

    this.trainerId = sessionStorage.getItem("trainerId");
    this.loadMembers2();
  }

  loadMembers2() {
    this.improvementReportService.getAssgnedMembers(this.trainerId).subscribe(data => {
      this.trainerMemberList = data;
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
