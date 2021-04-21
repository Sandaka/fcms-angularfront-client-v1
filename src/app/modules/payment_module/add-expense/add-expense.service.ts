import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expenses } from 'src/app/classes/expenses';

@Injectable({
  providedIn: 'root'
})
export class AddExpenseService {

  private baseUrl = 'http://localhost:9090/fcms/v1';

  constructor(private http: HttpClient) { }

  saveExpense(expense: Expenses): Observable<any> {
    return this.http.post(`${this.baseUrl}/expense`, expense);
  }
}
