import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Customer/customer-data/User.model';
import { ApiResponse } from '.././Payment/mark-cash/ApiResponse.model'; // Import ApiResponse

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = `http://localhost:8080/employee`; // Backend URL for user profile

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<ApiResponse<User>> { // Update return type
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token') || ''
    });
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/getEmployeeProfile`, { headers, withCredentials: true });
  }

  updateUserProfile(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token') || '',
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/update`, user, { headers, withCredentials: true });
  }
}
