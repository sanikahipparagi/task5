import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from './Invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private apiUrl = 'http://localhost:8080/employee/getBills'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<{ data: Invoice[] }> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ${token}',  // replace with your token service
      'Content-Type': 'application/json'
    });

    return this.http.get<{ data: Invoice[] }>(this.apiUrl, {
      headers: headers,
      withCredentials: true  // Adding withCredentials here
    });
  }
}
