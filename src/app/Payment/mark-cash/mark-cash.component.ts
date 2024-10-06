import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MarkCashService } from './mark-cash.service';
import { HttpClientModule } from '@angular/common/http';
import { Transaction } from './payment.model';
import { ApiResponse } from './ApiResponse.model';

@Component({
  selector: 'app-mark-cash',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [MarkCashService],
  templateUrl: './mark-cash.component.html',
  styleUrls: ['./mark-cash.component.css']
})
export class MarkCashComponent implements OnInit {

  transactions: Transaction[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  constructor(private transactionService: MarkCashService) {}

  ngOnInit(): void {
    this.loadTransactions(); // Load the transactions on component initialization
  }

  // Method to load transactions from the backend
  loadTransactions(): void {
    this.transactionService.getTransactions(this.currentPage - 1, this.itemsPerPage).subscribe(
        (response: ApiResponse<Transaction[]>) => {
            if (response && Array.isArray(response.data)) {
                this.transactions = response.data; // Set the transactions from the response
                this.totalPages = Number(response.totalPages); // Ensure totalPages is a number
            } else {
                console.error('Invalid response data:', response);
                this.transactions = []; // Reset transactions in case of error
            }
        },
        (error: any) => {
            console.error('Error fetching transactions', error);
            this.transactions = []; // Reset transactions on error
        }
    );
}



  // Mark transaction as paid via cash
  markAsPaid(transactionId: string): void {
    this.transactionService.markAsCashPaid(transactionId).subscribe(
      (response: Transaction) => {
        // Find the transaction and update its status
        const transaction = this.transactions.find(t => t.txnId === transactionId);
        if (transaction) {
          transaction.transactionStatus = 'PAID'; // Update the status to 'PAID'
          alert(`Transaction ID ${transactionId} marked as paid through cash!`);
        }
        this.loadTransactions(); // Refresh the displayed transactions after marking as paid
      },
      (error: any) => {
        console.error('Error marking transaction as paid', error);
      }
    );
  }
  

  // Pagination logic
  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadTransactions(); // Load transactions for the new page
    }
  }
}
