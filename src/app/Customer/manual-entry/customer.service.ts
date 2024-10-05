import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:8080/employee/addBill'; // Your API endpoint for customer data

  constructor(private http: HttpClient) { }

  saveCustomerData(customerData: any) { // Ensure this method is defined
    return this.http.post(this.apiUrl, customerData, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      return throwError(`Error: ${error.error.message}`);
    } else {
      // Backend returned an unsuccessful response code
      return throwError(`Server Error: ${error.status}, ${error.message}`);
    }
  }
}
