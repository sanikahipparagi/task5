import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  InvoiceServiceService } from './invoice-service.service'; // Make sure to import your InvoiceService
import { ApiResponse } from './response.model'; // Adjust import based on where your ApiResponse is defined
import { Invoice } from './invoice.model'; // Adjust import based on where your Invoice model is defined
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[InvoiceServiceService],
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'] // Use styleUrls instead of styleUrl
})
export class InvoiceDetailsComponent implements OnInit {
  invoice: Invoice | null = null;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceServiceService
  ) {}

  ngOnInit(): void {
    const billId = this.route.snapshot.paramMap.get('billId');
    if (billId) {
      this.getInvoiceDetails(billId);
    }
  }

  // Function to get invoice details based on invoice ID
  getInvoiceDetails(billId: string): void {
    console.log(`Fetching details for Invoice ID: ${billId}`);
    this.invoiceService.getInvoiceById(billId).subscribe({
      next: (response: ApiResponse<Invoice>) => {
        console.log('Fetched Invoice Data:', response);
        if (response && response.data) {
          this.invoice = response.data;
          // Format dates if necessary
          this.invoice.monthOfTheBill = this.formatDate(this.invoice.monthOfTheBill);
          this.invoice.dueDate = this.formatDate(this.invoice.dueDate);
        } else {
          console.error('No invoice data found in the response');
        }
      },
      error: (err) => console.error('Error fetching invoice details:', err)
    });
  }

  // Function to format date
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
