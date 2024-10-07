import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './User.model';
import { Page } from './Page.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {
  private apiUrl = `http://localhost:8080/employee`; 

  constructor(private http: HttpClient) {}

  
  getCustomers(page: number, size: number): Observable<Page<User[]>> {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token') || ''
    });

    return this.http.get<Page<User[]>>(
      `${this.apiUrl}/getCustomers?page=${page}&size=${size}`,
      { headers, withCredentials: true } 
    );
  }

 
  searchCustomersByFilter(isActiveStatus: boolean, page: number, size: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token') || ''
    });

    return this.http.get(
      `${this.apiUrl}/getCustomersByFilter?isActiveStatus=${isActiveStatus}&page=${page}&size=${size}`,
      { headers, withCredentials: true } 
    );
  }

  
  updateCustomer(customer: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token') || ''
    });
  
    return this.http.post(
      `${this.apiUrl}/updateCustomer/${customer.userId}`,
      customer,
      { headers, withCredentials: true } 
    );
  }

  sendEmailInvoice(customer:User):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token') || ''
    });

    return this.http.get(
      `http://localhost:8080/invoice/sendInvoiceEmail/${customer.userId}`,
      { headers, withCredentials: true } 
    );
  }
}
