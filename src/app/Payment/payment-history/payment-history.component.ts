import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {PaymentService} from './payment.service';

interface Transaction {
  txnId: string;
  billId: string;
  dueDate: Date;
  amount: number;
  paymentMethod: string;
}

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[PaymentService],
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.css'
})
export class PaymentHistoryComponent implements OnInit {

  transactions: Transaction[] = []; // Will hold transaction data
  paginatedTransactions: Transaction[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(private paymentService : PaymentService) {}

  ngOnInit(): void {
    this.loadTransactions(this.currentPage); // Fetch data on component initialization
  }

  // Fetch transactions from the backend
  loadTransactions(page: number): void {
    this.paymentService.getTransactions(page - 1, this.itemsPerPage).subscribe({
      next: (response) => {
        if (response.data && response.data.length) {
          this.transactions = response.data; // Ensure 'data' field exists and has length
        } else {
          this.transactions = []; // Set to an empty array if no data is found
        }
  
        // Ensure totalElements is a valid number
        const totalElements = response.totalElements || 0; 
  
        // Safely calculate totalPages
        this.totalPages = Math.ceil(totalElements / this.itemsPerPage);
  
        // Paginate the transactions only if there are transactions
        this.paginateTransactions();
      },
      error: (err) => console.error('Error fetching transactions', err),
    });
  }
  

  updatePagination(): void {
    this.paginateTransactions();
  }

  paginateTransactions(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = Math.min(start + this.itemsPerPage, this.transactions.length); // Prevent overflow
  
    // Only slice if transactions array is non-empty and start/end are valid
    if (this.transactions.length > 0 && start < this.transactions.length) {
      this.paginatedTransactions = this.transactions.slice(start, end);
    } else {
      this.paginatedTransactions = []; // Empty array if no valid transactions
    }
  }
  

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadTransactions(this.currentPage); // Fetch new data when page changes
  }
}
