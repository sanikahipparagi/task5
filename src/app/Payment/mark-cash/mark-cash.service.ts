import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from './payment.model';
import { ApiResponse } from './ApiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class MarkCashService {

  private baseUrl = 'http://localhost:8080/employee'; // Backend URL

  constructor(private http: HttpClient) {}

  // Method to get transactions with pagination
  getTransactions(page: number, size: number): Observable<ApiResponse<Transaction[]>> {
    const token = this.getToken(); // Method to get the Bearer token
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ApiResponse<Transaction[]>>(`${this.baseUrl}/getTransactions`, {
      headers: headers,
      params: { page: page.toString(), size: size.toString() },
      withCredentials: true
    });
  }

  // Mark a transaction as paid via cash
  markAsCashPaid(transactionId: string): Observable<Transaction> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    // Call the PUT endpoint with the transaction ID
    return this.http.put<Transaction>(`${this.baseUrl}/markCashPayment/${transactionId}`, {}, { headers });
  }

  // Mock method to get the Bearer token (replace with actual implementation)
  private getToken(): string {
    return localStorage.getItem('authToken') || ''; // Fetch the token from local storage
  }
}
