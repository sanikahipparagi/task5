import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const token = this.getToken(); // Method to get the Bearer token (from storage or auth service)
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Bearer token header
    });

    return this.http.get(`${this.baseUrl}/getTransactions`, {
      headers: headers,
      params: { page: page.toString(), size: size.toString() },
      withCredentials: true // Ensuring credentials (cookies) are sent with the request
    });
  }

  // Mock method to get the Bearer token (replace with actual implementation)
  private getToken(): string {
    // For example, getting the token from localStorage or a service
    return localStorage.getItem('authToken') || ''; // Make sure the token is available
  }
}
