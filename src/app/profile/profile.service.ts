// profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Customer/customer-data/User.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = `http://localhost:8080/employee`; // Backend URL for user profile

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token') || ''
    });
    return this.http.get<User>(`${this.apiUrl}/getEmployeeProfile`, { headers,withCredentials:true });
  }

  updateUserProfile(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token') || ''
    });
    return this.http.put(`${this.apiUrl}/update`, user, { headers,withCredentials:true });
  }
}
