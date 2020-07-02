import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DaterangeReportService } from './daterange-report.service';
import { SelectedPeriodData } from 'src/app/classes/profit-reports/selectedPeriodData';
import { IncomeData } from 'src/app/classes/profit-reports/incomeData';
import { ExpenseData } from 'src/app/classes/profit-reports/expenseData';
import { Observable } from 'rxjs';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-daterange-report',
  templateUrl: './daterange-report.component.html',
  styleUrls: ['./daterange-report.component.scss']
})
export class DaterangeReportComponent implements OnInit {

  // for date picker
  myDateValue: Date;

  dateRangeReportForm: FormGroup;
  incomeExpenseDataList: SelectedPeriodData;
  incomeDataList: Array<IncomeData>;
  expenseDataList: Array<ExpenseData>;

  totalIncomeCal: number = 0.00;
  totalExpenseCal: number = 0.00;
  totalProfit: number = 0.00;

  constructor(private formBuilder: FormBuilder, private dateRangeReportService: DaterangeReportService, private toastr: ToastrService) { }

  ngOnInit() {
    // date picker
    this.myDateValue = new Date();
    this.dateRangeReportForm = this.formBuilder.group({
      fromdate: [null, [Validators.required]],
      todate: [null, [Validators.required]],
    });
  }

  loadReport(fromDate: string, toDate: string) {
    console.log(fromDate); //
    this.totalIncomeCal = 0.00;
    this.totalExpenseCal = 0.00;
    this.totalProfit = 0.00;

    fromDate = this.dateConvertor(fromDate);
    toDate = this.dateConvertor(toDate);

    this.dateRangeReportService.getSelectedPeriodReportData(fromDate, toDate).subscribe(data => {
      this.incomeExpenseDataList = data;
      console.log(data);//
      this.incomeDataList = this.incomeExpenseDataList.incomeDataList;
      this.expenseDataList = this.incomeExpenseDataList.expenseDataList;
      console.log(this.incomeDataList);//
      if (null === this.incomeDataList) {
        this.noIncome();
      }
      if (null === this.expenseDataList) {
        this.noExpenses();
      }

      this.calculateTotal();
    });
  }

  dateConvertor(parseDate: string) {
    var date = new Date(parseDate),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  // date picker
  onDateChange(newDate: Date) {
    console.log(newDate);
  }


  get fromdate() {
    return this.dateRangeReportForm.get("fromdate");
  }

  get todate() {
    return this.dateRangeReportForm.get("todate");
  }

  // Toastr
  noExpenses() {
    this.toastr.warning('for this search criteria', 'No Expenses!',
      { timeOut: 3000 });;
  }

  noIncome() {
    this.toastr.warning('for this search criteria', 'No Income!',
      { timeOut: 3000 });;
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
}
