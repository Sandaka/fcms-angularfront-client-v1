import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { Observable } from 'rxjs';
import { BodyImprovementsReport } from 'src/app/classes/bodyImprovementsReport';
import { DashboardModuleService } from '../dashboard-module.service';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.scss']
})
export class MemberDashboardComponent implements OnInit {

  memberId: any;
  improvementsList: Observable<BodyImprovementsReport[]>;
  improvementOb1: BodyImprovementsReport;
  improvementOb2: BodyImprovementsReport;

  constructor(private dasboardService: DashboardModuleService) { }

  ngOnInit() {
    this.memberId = sessionStorage.getItem('memberId');
    this.loadBIReports();
  }

  loadBIReports() {

    this.dasboardService.getMemberBIReport(this.memberId).subscribe(data => {
      this.improvementsList = data;
      console.log(this.improvementsList[0]);

      this.improvementOb1 = this.improvementsList[0];
      console.log(this.improvementOb1);

      this.improvementOb2 = this.improvementsList[1];

      var absReport = new Chart("absReport", {
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
      var bycepReport = new Chart("bycepReport", {
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
      var calvesReport = new Chart("calvesReport", {
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
      var chestReport = new Chart("chestReport", {
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
      var forearmsReport = new Chart("forearmsReport", {
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
      var shouldersReport = new Chart("shouldersReport", {
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
