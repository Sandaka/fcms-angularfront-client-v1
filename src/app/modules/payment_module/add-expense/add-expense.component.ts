import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { Expenses } from 'src/app/classes/expenses';
import { AddExpenseService } from './add-expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {

  addExpenseForm: FormGroup;

  constructor(private addExpenseService: AddExpenseService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.addExpenseForm = this.formBuilder.group({
      amount: [null, [Validators.required, RxwebValidators.numeric({ allowDecimal: true, isFormat: true })]],
      description: [null, [Validators.required]]
    });
  }

  saveExpense(expense: Expenses) {
    expense.lastEdit = sessionStorage.getItem('authenticatedUser');
    this.addExpenseService.saveExpense(expense).subscribe(data => {
      console.log(data), error => console.log(error)
      if (data) {
        this.showSuccess();
        this.addExpenseForm.reset();
      } else {
        this.showError();
      }
    });
  }

  // requested values from form
  get amount() {
    return this.addExpenseForm.get('amount');
  }

  get description() {
    return this.addExpenseForm.get("description");
  }

  // Toastr
  showSuccess() {
    this.toastr.success('Expense Added', 'Successfully!',
      { timeOut: 3000 });;
  }
  showError() {
    this.toastr.error('Something Went Wrong!', 'Please check again',
      { timeOut: 4000 });
  }
}
