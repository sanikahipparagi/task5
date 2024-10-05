import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceService } from './invoice.service';
import { Invoice } from './Invoice.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-invoice',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers:[InvoiceService],
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.scss']
})
export class ListInvoiceComponent implements OnInit {
  invoices: Invoice[] = []; // All invoices fetched from the backend
  paginatedInvoices: Invoice[] = []; // Invoices for the current page
  currentPage = 1;
  itemsPerPage = 5; // Set how many items per page
  totalPages = 1; // Total number of pages
  searchTerm = '';

  constructor(private router: Router, private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.fetchInvoices(); // Load invoices when the component is initialized
  }

  // Fetch invoices from the backend
  fetchInvoices(): void {
    this.invoiceService.getInvoices().subscribe({
      next: (response) => {
        if (response && Array.isArray(response.data)) {
          this.invoices = response.data; // Assign fetched invoices to the invoices array
          this.paginateInvoices(); // Paginate the fetched invoices
        } else {
          console.error('Unexpected response format');
        }
      },
      error: (err) => {
        console.error('Error fetching invoices:', err);
      }
    });
  }

  // Filter invoices based on search term and paginate
  filterInvoices(): void {
    this.paginatedInvoices = this.invoices
      .filter(invoice => invoice.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
    this.totalPages = Math.ceil(this.invoices.filter(invoice => invoice.name.toLowerCase().includes(this.searchTerm.toLowerCase())).length / this.itemsPerPage);
  }

  // Paginate invoices
  paginateInvoices(): void {
    this.paginatedInvoices = this.invoices.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
    this.totalPages = Math.ceil(this.invoices.length / this.itemsPerPage);
  }

  // Change the current page
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateInvoices();
  }

  // Navigate to view a specific invoice
  viewInvoice(billId: string): void {
    this.router.navigate(['/invoice', billId]);
  }
}
