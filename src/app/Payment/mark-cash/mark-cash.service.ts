import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Transaction} from './payment.model';

@Injectable({
  providedIn: 'root'
})
export class MarkCashService {

  private baseUrl = 'http://localhost:8080/employee'; // Your backend base URL

  constructor(private http: HttpClient) { }

  markAsCashPaid(transactionId: string): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.baseUrl}/markCashPayment/${transactionId}`, {});
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/transactions`);
  }
  
}
