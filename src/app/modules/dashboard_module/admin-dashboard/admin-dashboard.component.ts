import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'node_modules/chart.js';
import { Observable } from 'rxjs';
import { ProfitGraph } from 'src/app/classes/profit-reports/profitGraph';
import { DashboardModuleService } from '../dashboard-module.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  monthlyProfitList: Observable<ProfitGraph[]>;
  annualProfitList: Observable<ProfitGraph[]>;
  monthArray: string[] = Array();
  monthlyProfitArray: any[] = Array();
  monthlyProfitGraph: ProfitGraph;

  yearArray: string[] = Array();
  yearProfitArray: any[] = Array();
  yearProfitGraph: ProfitGraph;

  constructor(private dasboardService: DashboardModuleService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadReports();
    this.showInfoMsg();
  }

  loadReports() {

    this.dasboardService.generateAdminMonthlyGraph().subscribe(data => {
      this.monthlyProfitList = data;
      console.log(this.monthlyProfitList);

      data.forEach(element => {
        this.monthlyProfitGraph = element;
        this.monthlyProfitArray.push(this.monthlyProfitGraph.profit);
        console.log(this.monthlyProfitArray);

        this.monthArray.push(this.monthlyProfitGraph.month);

      });

      var monthlyReport = new Chart("monthlyReport", {
        type: 'line',
        data: {
          labels: this.monthArray,
          datasets: [{
            label: 'Monthly Report for This Year',
            data: this.monthlyProfitArray,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        }
      });
    });


    this.dasboardService.generateAdminAnnualGraph().subscribe(data => {
      this.annualProfitList = data;
      console.log(this.annualProfitList);

      data.forEach(element => {
        this.yearProfitGraph = element;
        this.yearProfitArray.push(this.yearProfitGraph.profit);
        this.yearArray.push(this.yearProfitGraph.year);
      });

      var annualReport = new Chart("annualReport", {
        type: 'bar',
        data: {
          labels: this.yearArray,
          datasets: [{
            label: 'Income Report for Last 5 Years',
            data: this.yearProfitArray,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(255, 159, 64, 0.5)',
              'rgba(255, 205, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              // 'rgba(153, 102, 255, 0.2)',
              // 'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              // 'rgb(153, 102, 255)',
              // 'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }],
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          },
        }
      });
    });
  }

  // Toastr
  showInfoMsg() {
    this.toastr.info('You can generate detailed profit reports from PROFIT REPORT section', 'Hi Admin!',
      { timeOut: 6000 });;
  }
}
