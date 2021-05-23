import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { DashboardModuleService } from '../dashboard-module.service';

@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.scss']
})
export class TrainerDashboardComponent implements OnInit {

  announcementCount: number;
  pendingPaymentCount: number;
  expSchedulesCount: number;
  memberCount: number;
  trainerId: string;

  constructor(private dasboardService: DashboardModuleService) { }

  ngOnInit() {

    this.trainerId = sessionStorage.getItem('trainerId');
    this.fillTopTile();

    var myChart = new Chart("myChart", {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
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
  }


  fillTopTile() {

    this.dasboardService.getAnnouncements().subscribe(data => {
      this.announcementCount = data;
    });

    this.dasboardService.getTrainerPendingPayments(this.trainerId).subscribe(data => {
      this.pendingPaymentCount = data;
    });

    this.dasboardService.getTrainerExpiringSchedules(this.trainerId).subscribe(data => {
      this.expSchedulesCount = data;
    });

    this.dasboardService.getTrainerMemberCount(this.trainerId).subscribe(data => {
      this.memberCount = data;
    });
  }
}
