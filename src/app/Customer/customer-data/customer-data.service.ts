import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './User.model';
import { Page } from './Page.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {
  private apiUrl = `http://localhost:8080/employee`; // Assuming 'apiUrl' is your backend URL

  constructor(private http: HttpClient) {}

  // Fetch customers with pagination
  getCustomers(page: number, size: number): Observable<Page<User[]>> {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token') || ''
    });

    return this.http.get<Page<User[]>>(
      `${this.apiUrl}/getCustomers?page=${page}&size=${size}`,
      { headers, withCredentials: true } // Include withCredentials
    );
  }

  // Search customers based on filters
  searchCustomersByFilter(isActiveStatus: boolean, page: number, size: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token') || ''
    });

    return this.http.get(
      `${this.apiUrl}/getCustomersByFilter?isActiveStatus=${isActiveStatus}&page=${page}&size=${size}`,
      { headers, withCredentials: true } // Include withCredentials
    );
  }

  // Update a customer
  updateCustomer(customer: User): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token') || ''
    });

    return this.http.post(
      `${this.apiUrl}/update`,
      customer,
      { headers, withCredentials: true } // Include withCredentials
    ); // Assuming endpoint is set up on backend
  }  
}
