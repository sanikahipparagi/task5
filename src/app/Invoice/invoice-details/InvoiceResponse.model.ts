// invoice-response.model.ts
import {Invoice} from '../list-invoice/Invoice.model';


export interface InvoiceResponse {
    data: Invoice[]; // Array of invoices
    total: number;   // Total number of invoices
    page: number;    // Current page number
    size: number;    // Size of each page
  }
  