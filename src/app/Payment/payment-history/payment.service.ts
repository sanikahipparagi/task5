import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface Transaction {
  txnId: string;
  billId: string;
  dueDate: Date;
  amount: number;
  paymentMethod: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:8080/employee'; // Backend URL

  constructor(private http: HttpClient) {}

  // Method to get transactions with pagination
  getTransactions(page: number, size: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getTransactions`, {
      params: { page: page.toString(), size: size.toString() },
    });
  }

 
}
