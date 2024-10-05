import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './response.model';
import { Invoice } from '../list-invoice/Invoice.model';
import {InvoiceResponse} from './InvoiceResponse.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceServiceService {

  private apiUrl = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) {}

  // Fetch invoices with pagination
  getInvoices(page: number, size: number): Observable<InvoiceResponse> {
  
    const headers = new HttpHeaders({
      'Authorization' : localStorage.getItem('token') || ''
    })

    return this.http.get<InvoiceResponse>(`${this.apiUrl}/getBills?page=${page}&size=${size}`,{headers});
  }

  // Fetch a specific invoice by its ID
  getInvoiceById(billId: string): Observable<ApiResponse<Invoice>> {
    const headers = new HttpHeaders({
      'Authorization' : localStorage.getItem('token') || ''
    })
    return this.http.get<ApiResponse<Invoice>>(`${this.apiUrl}/getBillById/${billId}`,{headers});
  }
}
