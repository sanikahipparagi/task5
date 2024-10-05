import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiResponce } from './apiResponse.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,RouterOutlet,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  employeeId: string = '';  // Customer ID input
  otp: string[] = ['', '', '', '', '', ''];  // OTP array for 6 digits
  otpRequested: boolean = false;  // Boolean to show/hide OTP input
  otpError: boolean = false;  // Boolean for OTP error message
  otpMessage: string = '';  // Message when OTP is sent
  loginError: string='';
  employeeIdError: string='';

  constructor(private router:Router,private http: HttpClient){}

  // Method to request OTP (slide in the OTP input)
  requestOtp() {
    if (!this.employeeId || this.employeeId.trim() === '') {
      this.employeeIdError = 'Employee ID is required to generate OTP.';
      return;
    } else {
      this.employeeIdError = '';
      this.http.get<ApiResponce>(`http://localhost:8080/auth/generateOtp?userId=${encodeURIComponent(this.employeeId)}`, { withCredentials: true })
        .subscribe(
          (response) => {
            if (response.err) {
              this.loginError = response.message;  // Use response message for error
            } else {
              this.otpRequested = true;  // Show OTP input
              this.otpMessage = response.message || 'OTP has been sent to your registered email.';
              console.log('OTP sent:', response.message);
            }
          },
          (error) => {
            this.loginError = 'Error sending OTP. Please try again.';
          }
        );
    }
  }
  moveToNext(event: any, index: number) {
    const input = event.target;
    const isNumeric = /^\d$/.test(input.value);

    if (input.value.length === 1 && isNumeric && index < 5) {
      const nextInput = document.querySelectorAll('.otp-input')[index + 1] as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    } else if (input.value.length === 0 && index > 0) {
      // If backspace and empty, move to the previous input
      const prevInput = document.querySelectorAll('.otp-input')[index - 1] as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  }

  // Method to handle login (OTP validation)
  login() {
    if (this.otp.join('').length !== 6) {
      this.otpError = true;  // Show OTP error message
      return;
    }

    this.http.get<ApiResponce>(`http://localhost:8080/auth/verifyOtp?userId=${encodeURIComponent(this.employeeId)}&otp=${this.otp.join('')}&otpType=VERIFY_USER`, { withCredentials: true })
      .subscribe(
        (response) => {
          if (response.err) {
            this.loginError = response.message;  // Use response message for error
          } else {
            console.log('Login successful:', response.data);  // Handle successful login
            // Optionally store the token or other relevant data
            localStorage.setItem("token", response.message);
            this.router.navigate(['/dashboard']);
          }
        },
        (error) => {
          this.loginError = 'Invalid OTP or login error.';
        }
      );
  }

}
