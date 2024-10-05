import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-generate-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './generate-invoice.component.html',
  styleUrl: './generate-invoice.component.css'
})
export class GenerateInvoiceComponent {

  fileUploadForm: FormGroup;
  uploadSuccess: boolean = false;
  uploadError: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.fileUploadForm = this.fb.group({
      file: [null, Validators.required],
    });
  }

  // Handle file selection
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileUploadForm.patchValue({ file });
      this.uploadError = null;
    }
  }

  // Fetch token from storage
  private getToken(): string | null {
    return localStorage.getItem('accessToken'); // Adjust if using sessionStorage
  }

  // Handle form submission and file upload
  onSubmit() {
    if (this.fileUploadForm.valid) {
      const file = this.fileUploadForm.get('file')?.value;
      if (file) {
        this.sendInvoicesToBackend(file);  // Call API to send file
      }
    } else {
      this.uploadError = "Please select a file to upload.";
      this.uploadSuccess = false;
    }
  }

  // Send the file to the backend
  sendInvoicesToBackend(file: File) {
    const formData = new FormData();
    formData.append('file', file); // Append selected file

    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `${token}` // Attach the token in the Authorization header
    });

    this.http.post('http://localhost:8080/excel/addBulkBillByExcel', formData, { headers }).subscribe(
      (response) => {
        console.log('Invoices uploaded successfully:', response);
        this.uploadSuccess = true;
        this.uploadError = null;
      },
      (error) => {
        console.error('Error uploading invoices:', error);
        this.uploadError = 'Error uploading invoices. Please try again.';
        this.uploadSuccess = false;
      }
    );
  }
}
