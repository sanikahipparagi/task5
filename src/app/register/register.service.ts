import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDTO } from './registerDto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:8080/auth'; // Update this with your actual backend URL

  constructor(private http: HttpClient) { }

  registerEmployee(employeeData: RegisterDTO): Observable<any> {
    const token = localStorage.getItem('adminToken');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/signUpUser`, employeeData, { 
      headers, 
      withCredentials: true // Adding withCredentials
    });
  }

  checkEmailExists(email: string): Observable<{ exists: boolean }> {
    const token = localStorage.getItem('adminToken');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/check-email?email=${encodeURIComponent(email)}`, {
      headers,
      withCredentials: true // Adding withCredentials
    });
  }
}
