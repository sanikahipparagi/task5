import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from './Invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private apiUrl = 'http://localhost:8080/api/invoices'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<{ data: Invoice[] }> {
    return this.http.get<{ data: Invoice[] }>(this.apiUrl);
  }
}
