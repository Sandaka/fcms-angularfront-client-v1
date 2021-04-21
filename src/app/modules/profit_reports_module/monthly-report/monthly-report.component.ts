import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { ToastrService } from 'ngx-toastr';
import { ExpenseData } from 'src/app/classes/profit-reports/expenseData';
import { IncomeData } from 'src/app/classes/profit-reports/incomeData';
import { SelectedPeriodData } from 'src/app/classes/profit-reports/selectedPeriodData';
import { MonthlyReportService } from './monthly-report.service';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.scss']
})
export class MonthlyReportComponent implements OnInit {

  incomeExpenseDataList: SelectedPeriodData;
  incomeDataList: Array<IncomeData>;
  expenseDataList: Array<ExpenseData>;

  totalIncomeCal: number = 0.00;
  totalExpenseCal: number = 0.00;
  totalProfit: number = 0.00;

  constructor(private monthlyReportService: MonthlyReportService, private toastr: ToastrService) { }

  ngOnInit() {
    this.refreshMonthlyReport();

    var monthlyReport = new Chart("monthlyReport", {
      type: 'line',
      data : {
        labels: ["a", "b", "c","d","e","f","g"],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  }

  refreshMonthlyReport() {
    this.totalIncomeCal = 0.00;
    this.totalExpenseCal = 0.00;
    this.totalProfit = 0.00;

    this.monthlyReportService.getMonthlyReportData().subscribe(data => {
      this.incomeExpenseDataList = data;

      this.incomeDataList = this.incomeExpenseDataList.incomeDataList;
      this.expenseDataList = this.incomeExpenseDataList.expenseDataList;

      if (null === this.incomeDataList) {
        this.noIncome();
      }
      if (null === this.expenseDataList) {
        this.noExpenses();
      }

      this.calculateTotal();
    });
  }

  calculateTotal() {
    if (null !== this.incomeDataList) {
      this.incomeDataList.forEach(element => {
        this.totalIncomeCal = this.totalIncomeCal + element.totalIncome;
      });
    } else {
      this.totalIncomeCal = 0.00;
    }

    if (null !== this.expenseDataList) {
      this.expenseDataList.forEach(element => {
        this.totalExpenseCal = this.totalExpenseCal + element.totalExpense
      });
    } else {
      this.totalExpenseCal = 0.00;
    }

    this.totalProfit = this.totalIncomeCal - this.totalExpenseCal;
    console.log("profit: " + this.totalProfit);
  }

  // Toastr
  noExpenses() {
    this.toastr.warning('for this month', 'No Expenses!',
      { timeOut: 3000 });;
  }

  noIncome() {
    this.toastr.warning('for this month', 'No Income!',
      { timeOut: 3000 });;
  }

}
