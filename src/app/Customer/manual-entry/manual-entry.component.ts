import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {CustomerService} from './customer.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-manual-entry',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,HttpClientModule],
  providers: [CustomerService],
  templateUrl: './manual-entry.component.html',
  styleUrl: './manual-entry.component.css'
})
export class ManualEntryComponent implements OnInit  {

  billForm: FormGroup;
  notificationMessage: string = '';
  isSuccess: boolean = false;

  constructor(private fb: FormBuilder, private customerService: CustomerService) {
    this.billForm = this.fb.group({
      customerId: ['', Validators.required],
      unitConsumption: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
      billDuration: ['', [Validators.required, Validators.pattern(/^\d{4}\/\d{2}$/), this.validMonth]],
      billDueDate: ['', [Validators.required, Validators.pattern(/^\d{4}\/\d{2}\/\d{2}$/), this.validDate.bind(this)]], // Bind 'this' context
    });
  }

  ngOnInit(): void {}

  // Custom validator to check valid month
  validMonth(control: any) {
    const value = control.value;
    const monthMatch = value.match(/^\d{4}\/(\d{2})$/);
    if (monthMatch) {
      const month = parseInt(monthMatch[1], 10);
      return month >= 1 && month <= 12 ? null : { invalidMonth: true };
    }
    return { invalidMonth: true };
  }

  // Custom validator to check valid date
  validDate(control: any) {
    const value = control.value;
    const dateMatch = value.match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
    if (dateMatch) {
      const year = parseInt(dateMatch[1], 10);
      const month = parseInt(dateMatch[2], 10);
      const day = parseInt(dateMatch[3], 10);

      // Check if the day is valid for the month
      const isValidDay = this.isValidDay(year, month, day); // Now works correctly
      return isValidDay ? null : { invalidDate: true };
    }
    return { invalidDate: true };
  }

  // Function to check if a day is valid for a given month and year
  private isValidDay(year: number, month: number, day: number): boolean {
    const monthDays = [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return day >= 1 && day <= monthDays[month - 1];
  }

  // Function to check if a year is a leap year
  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  onSubmit() {
    if (this.billForm.valid) {
      const billData = {
        userId: this.billForm.value.customerId,
        unitConsumption: this.billForm.value.unitConsumption,
        monthOfTheBill: this.billForm.value.billDuration, // Ensure this is formatted correctly for your backend
        dueDate: this.billForm.value.billDueDate,
      };

      this.customerService.saveCustomerData(billData) // Use the service to save data
        .subscribe({
          next: (response: any) => {
            this.isSuccess = true;
            this.notificationMessage = 'Bill submitted successfully!';
            this.billForm.reset(); // Reset form after submission
          },
          error: (err: any) => {
            this.isSuccess = false;
            this.notificationMessage = `Error saving bill data: ${err}`;
          },
        });
    } else {
      this.isSuccess = false;
      this.notificationMessage = 'Error: Please fill in all the required fields correctly!';
    }

    // Clear notification after a few seconds
    setTimeout(() => {
      this.notificationMessage = '';
    }, 3000); // 3 seconds
  }
}
