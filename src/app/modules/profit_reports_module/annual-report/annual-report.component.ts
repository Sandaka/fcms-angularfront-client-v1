import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ExpenseData } from 'src/app/classes/profit-reports/expenseData';
import { IncomeData } from 'src/app/classes/profit-reports/incomeData';
import { SelectedPeriodData } from 'src/app/classes/profit-reports/selectedPeriodData';
import { AnnualReportService } from './annual-report.service';

@Component({
  selector: 'app-annual-report',
  templateUrl: './annual-report.component.html',
  styleUrls: ['./annual-report.component.scss']
})
export class AnnualReportComponent implements OnInit {

  incomeExpenseDataList: SelectedPeriodData;
  incomeDataList: Array<IncomeData>;
  expenseDataList: Array<ExpenseData>;

  totalIncomeCal: number = 0.00;
  totalExpenseCal: number = 0.00;
  totalProfit: number = 0.00;

  constructor(private annualReportService: AnnualReportService, private toastr: ToastrService) { }

  ngOnInit() {
    this.refreshAnnualReport();
  }

  refreshAnnualReport() {
    this.totalIncomeCal = 0.00;
    this.totalExpenseCal = 0.00;
    this.totalProfit = 0.00;

    this.annualReportService.getAnnualReportData().subscribe(data => {
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
    this.toastr.warning('for this year', 'No Expenses!',
      { timeOut: 3000 });;
  }

  noIncome() {
    this.toastr.warning('for this year', 'No Income!',
      { timeOut: 3000 });;
  }

}
