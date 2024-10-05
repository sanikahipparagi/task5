import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { RegisterDTO } from './registerDto.model';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,RouterOutlet,HttpClientModule],
  providers: [RegisterService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  employeeData: RegisterDTO = {
    firstName:'',
    lastName:'',
    name: '', // This will hold the concatenated name
    email: '',
    phNo: '',
    address: ''
  };

  registrationSuccess = false;
  registrationError = '';
  emailExistsError = ''; 

  constructor(private employeeService: RegisterService, private router: Router) {}  // Inject Router

  register() {
    if (this.isFormValid()) {
      // Check if the email exists
      this.employeeService.checkEmailExists(this.employeeData.email).subscribe({
        next: (response) => {
          if (response.exists) {  // Assuming response contains { exists: true/false }
            this.emailExistsError = 'Email ID already exists. Please enter a new email ID.';
          } else {
            this.emailExistsError = '';  // Clear any previous error

            // Validate phone number
            const phoneNumber = this.employeeData.phNo.replace(/\D/g, '');
            if (phoneNumber.length !== 10) {
              this.registrationError = 'Phone Number must be exactly 10 digits.';
              return;
            }

            this.employeeData.phNo = phoneNumber;
            this.employeeData.name = `${this.employeeData.firstName} ${this.employeeData.lastName}`;
            
            console.log('Data being sent to server:', this.employeeData); 

            this.employeeService.registerEmployee(this.employeeData).subscribe({
              next: (response) => {
                console.log('Registration successful:', response);
                this.registrationSuccess = true;
                this.router.navigate(['/login']); // Redirect to the login page
              },
              error: (err) => {
                console.error('Registration error:', err);
                this.registrationError = 'Registration failed: ' + err.error.message; // Display error message
              }
            });
          }
        },
        error: (err:any) => {
          console.error('Error checking email:', err);
          this.registrationError = 'Email already exists.Try with another email';
        }
      });
    } else {
      this.registrationError = 'All fields are required.';
    }
  }

  isFormValid() {
    return this.employeeData.firstName && this.employeeData.lastName && this.employeeData.email &&
           this.employeeData.phNo && this.employeeData.address;
  }
}
