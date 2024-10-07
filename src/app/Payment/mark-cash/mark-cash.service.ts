import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from './payment.model';
import { ApiResponse } from './ApiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class MarkCashService {

  private baseUrl = 'http://localhost:8080/employee'; 

  constructor(private http: HttpClient) {}

  
  getTransactions(page: number, size: number): Observable<ApiResponse<Transaction[]>> {
    const token = this.getToken(); 
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ApiResponse<Transaction[]>>(`${this.baseUrl}/getTransactions`, {
      headers: headers,
      params: { page: page.toString(), size: size.toString() },
      withCredentials: true
    });
  }

  
  markAsCashPaid(transactionId: string): Observable<Transaction> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    
    return this.http.put<Transaction>(`${this.baseUrl}/markCashPayment/${transactionId}`, {}, { headers });
  }

  
  private getToken(): string {
    return localStorage.getItem('authToken') || ''; 
  }
}
