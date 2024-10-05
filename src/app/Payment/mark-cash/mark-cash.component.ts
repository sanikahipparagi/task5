import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MarkCashService } from './mark-cash.service';
import { HttpClientModule } from '@angular/common/http';
import { Transaction } from './payment.model';

@Component({
  selector: 'app-mark-cash',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [MarkCashService],
  templateUrl: './mark-cash.component.html',
  styleUrls: ['./mark-cash.component.css'] // Update this to `styleUrls`
})
export class MarkCashComponent implements OnInit {

  transactions: Transaction[] = []; // This will hold your transaction data
  paginatedTransactions: Transaction[] = [];
  currentPage = 1;
  itemsPerPage = 5; // Number of items to display per page
  totalPages = 0;

  constructor(private transactionService: MarkCashService) {}

  ngOnInit(): void {
    this.loadTransactions(); // Load the transactions on component initialization
  }

  // Method to load transactions from the backend
  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe(
      (response: Transaction[]) => {
        this.transactions = response;
        this.totalPages = Math.ceil(this.transactions.length / this.itemsPerPage);
        this.updatePaginatedTransactions();
      },
      (error) => {
        console.error('Error fetching transactions', error);
      }
    );
  }

  // Update the paginated transactions based on the current page
  updatePaginatedTransactions(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedTransactions = this.transactions.slice(start, start + this.itemsPerPage);
  }

  // Mark transaction as paid via cash
  markAsPaid(transactionId: string): void {
    this.transactionService.markAsCashPaid(transactionId.toString()).subscribe(
      response => {
        const transaction = this.transactions.find(t => t.txnId === transactionId);
        if (transaction) {
          transaction.transactionStatus = 'PAID';
          alert(`Transaction ID ${transactionId} marked as paid through cash!`);
        }
        this.updatePaginatedTransactions();
      },
      error => {
        console.error('Error marking transaction as paid', error);
      }
    );
  }

  // Pagination logic
  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedTransactions();
    }
  }
}
