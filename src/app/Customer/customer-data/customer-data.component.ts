import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from './User.model';
import { CustomerDataService } from './customer-data.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-customer-data',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [CustomerDataService],
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.css'] 
})
export class CustomerDataComponent implements OnInit {
  private allCustomers: User[] = []; 
  paginatedCustomers: User[] = []; 
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 10; 
  searchFilter: string = '';
  isActiveFilter: boolean = true;

  editingCustomerId: string | null = null;
  editingCustomer: User | null = null; 

  constructor(private customerService: CustomerDataService) {}

  ngOnInit(): void {
    this.fetchCustomers(this.currentPage - 1, this.pageSize);
  }

  fetchCustomers(page: number, size: number): void {
    this.customerService.getCustomers(page, size).subscribe({
      next: (response: any) => {
        this.paginatedCustomers = response.data; 
        this.totalPages = Number(response.message);
      },
      error: (err: any) => { 
        console.error('Error fetching customers', err);
      }
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchCustomers(page - 1, this.pageSize); 
    }
  }

  searchCustomers(): void {
    this.customerService.searchCustomersByFilter(this.isActiveFilter, this.currentPage - 1, this.pageSize).subscribe({
      next: (response: any) => {
        this.paginatedCustomers = response.data;
        this.totalPages = Number(response.message);
      },
      error: (err: any) => {
        console.error('Error searching customers', err);
      }
    });
  }

  editCustomer(customerId: string): void {
    this.editingCustomerId = customerId; 
    this.editingCustomer = this.paginatedCustomers.find(customer => customer.userId === customerId) || null; 
  }

  updateCustomer(): void {
    if (this.editingCustomer) {
      this.customerService.updateCustomer(this.editingCustomer).subscribe({
        next: (response) => {
          console.log('Update response:', response);
          alert('Customer updated successfully');
          this.editingCustomerId = null; 
          this.editingCustomer = null; 
          this.fetchCustomers(this.currentPage - 1, this.pageSize); 
        },
        error: (error) => {
          console.error('Error updating customer:', error);
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingCustomerId = null; 
    this.editingCustomer = null; 
  }

  sendInvoice(userId: string): void {
    const customer = this.paginatedCustomers.find(c => c.userId === userId);
    if (customer) {
      this.customerService.sendEmailInvoice(customer).subscribe(
        response => {
          alert('Invoice sent successfully');
          console.log('Email sent response:', response);
        },
        error => {
          console.error('Error sending invoice:', error);
          alert('Error sending invoice');
        }
      );
    }
  }
}
