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
  getCustomers(page: number, size: number): Observable<Page<User>> {
    const headers = new HttpHeaders({
      'Authorization' : localStorage.getItem('token') || ''
    })

    return this.http.get<Page<User>>(`${this.apiUrl}/getCustomers?page=${page}&size=${size}`,{headers});
  }

  // Search customers based on filters
  searchCustomersByFilter(isActiveStatus: boolean, page: number, size: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization' : localStorage.getItem('token') || ''
    })

    return this.http.get(`${this.apiUrl}/getCustomersByFilter?isActiveStatus=${isActiveStatus}&page=${page}&size=${size}`,{headers});
  }

  // Fetch transactions filtered by name or transaction types
  searchTransactions(filterBy: string, filterValue: string, page: number, size: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization' : localStorage.getItem('token') || ''
    })

    return this.http.get(`${this.apiUrl}/getTransactionsByFilter?filterBy=${filterBy}&filterValue=${filterValue}&page=${page}&size=${size}`,{headers});
  }

  // Update a customer
  updateCustomer(customer: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization' : localStorage.getItem('token') || ''
    })

    return this.http.put(`${this.apiUrl}/updateCustomer`, customer,{headers}); // Assuming endpoint is set up on backend
  }

  // Delete a customer by ID
  deleteCustomer(customerId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization' : localStorage.getItem('token') || ''
    })

    return this.http.delete(`${this.apiUrl}/deleteCustomer/${customerId}`,{headers}); // Assuming endpoint is set up on backend
  }
}
