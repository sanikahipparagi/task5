import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-bulk-entry',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './bulk-entry.component.html',
  styleUrls: ['./bulk-entry.component.css']
})
export class BulkEntryComponent {
  fileUploadForm!: FormGroup;
  uploadSuccess: string = '';  // Success message
  uploadError: string = '';    // Error message
  selectedFile: File | null = null; // The selected file

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.fileUploadForm = this.fb.group({
      csvFile: [null, Validators.required]
    });
  }

  // Method to handle file selection
  onFileSelect(event: any): void {
    const file = event.target.files[0];
    const validFormats = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv', 'application/vnd.ms-excel.sheet.macroEnabled.12'];

    if (file && validFormats.includes(file.type)) {
      this.selectedFile = file;
      this.fileUploadForm.patchValue({ csvFile: file });  // Manually update the form control
      this.fileUploadForm.get('csvFile')?.updateValueAndValidity();  // Trigger validation
      this.uploadError = '';  // Clear previous errors
    } else {
      this.selectedFile = null;
      this.uploadError = 'Invalid file format. Please upload a valid Excel (.xls, .xlsx) or CSV file.';
    }
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.fileUploadForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post('http://localhost:8080/excel/upload', formData, { withCredentials: true })
        .pipe(
          catchError(this.handleError)
        )
        .subscribe({
          next: (response: any) => {
            this.uploadSuccess = response.message || 'Upload successful!';
            this.uploadError = '';  // Clear error message
            this.fileUploadForm.reset();  // Reset form after successful upload
            this.selectedFile = null;
          },
          error: (err: any) => {
            this.uploadError = err.message || 'File upload failed.';
            this.uploadSuccess = '';  // Clear success message
          }
        });
    } else {
      this.uploadError = 'Please select a valid file before submitting.';
    }
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      return throwError(`Error: ${error.error.message}`);
    } else {
      // Backend error
      return throwError(`Server Error: ${error.status}, ${error.message}`);
    }
  }
}
