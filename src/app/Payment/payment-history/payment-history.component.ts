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
        this.transactions = response.data; // Assuming response contains a 'data' field with transactions
        this.totalPages = Math.ceil(response.totalElements / this.itemsPerPage); // totalElements should be in your API response
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
    const end = start + this.itemsPerPage;
    this.paginatedTransactions = this.transactions.slice(start, end);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadTransactions(this.currentPage); // Fetch new data when page changes
  }
}
