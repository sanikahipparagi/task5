import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from './User.model';
import {CustomerDataService} from './customer-data.service'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-customer-data',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  providers:[CustomerDataService],
  templateUrl: './customer-data.component.html',
  styleUrl: './customer-data.component.css'
})
export class CustomerDataComponent {

  customers: User[] = [];  // Dynamic customer data
  totalCustomers: User[] = [];
  currentPage: number = 1;  // Current page for pagination
  itemsPerPage: number = 2; // Number of items per page
  totalPages: number = 1;   // Total pages for pagination
  searchFilter: string = ''; // Search filter

  constructor(private customerService: CustomerDataService) {}

  ngOnInit(): void {
    this.fetchCustomers(); // Fetch customers on component load
  }

  // Get paginated customers
  get paginatedCustomers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.totalCustomers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Fetch paginated customers from API
  fetchCustomers() {
    this.customerService.getCustomers(this.currentPage - 1, this.itemsPerPage).subscribe(response => {
      console.log(response);
      this.customers = response.data; // Ensure this matches your API response
      this.totalCustomers = [...this.totalCustomers, ...this.customers]; // Append new customers to total
      this.totalPages = Math.ceil(response.totalPages / this.itemsPerPage); // Calculate total pages
    }, error => {
      console.error('Error fetching customers:', error);
    });
  }

  // Search customers based on filter
  searchCustomers() {
    const isActive = this.searchFilter === 'active';  // Modify as per your filter logic
    this.customerService.searchCustomersByFilter(isActive, this.currentPage - 1, this.itemsPerPage).subscribe(response => {
      console.log(response);
      this.customers = response.data;
    });
  }

  // Function to handle update action
  updateCustomer(customer: User) {
    this.customerService.updateCustomer(customer).subscribe(response => {
      alert('Customer updated successfully');
      this.fetchCustomers();  // Refresh customers after update
    }, error => {
      console.error('Error updating customer:', error);
    });
  }

  // Function to handle delete action
  deleteCustomer(customerId: string) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(customerId).subscribe(response => {
        alert('Customer deleted successfully');
        this.fetchCustomers();  // Refresh customers after deletion
      }, error => {
        console.error('Error deleting customer:', error);
      });
    }
  }

  // Pagination controls
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchCustomers();  // Fetch customers for the selected page
    }
  }
}
