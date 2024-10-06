import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-bulk-entry',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './bulk-entry.component.html',
  styleUrls: ['./bulk-entry.component.css']
})
export class BulkEntryComponent implements OnInit {
  fileUploadForm!: FormGroup;
  uploadSuccess: string = '';
  uploadError: string = '';
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.fileUploadForm = this.fb.group({
      csvFile: [null, Validators.required]
    });
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    const validFormats = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv'
    ];

    console.log('Selected file:', file);

    if (file) {
      console.log('File type:', file.type);
      if (validFormats.includes(file.type)) {
        this.selectedFile = file;
        this.fileUploadForm.patchValue({ csvFile: file });
        this.fileUploadForm.get('csvFile')?.updateValueAndValidity();
        this.uploadError = '';
      } else {
        this.selectedFile = null;
        this.uploadError = 'Invalid file format. Please upload a valid Excel or CSV file.';
        console.error(this.uploadError);
      }
    } else {
      this.uploadError = 'No file selected.';
      console.error(this.uploadError);
    }
  }

  onSubmit(): void {
    if (this.fileUploadForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      console.log('Submitting form data:', formData);

      const options = { withCredentials: true }; 

      this.http.post('http://localhost:8080/excel/upload/users', formData,options)
        .pipe(catchError(this.handleError))
        .subscribe({
          next: (response: any) => {
            console.log('Upload response:', response);
            this.uploadSuccess = response.message || 'Upload successful!';
            this.uploadError = '';
            this.fileUploadForm.reset();
            this.selectedFile = null;
          },
          error: (err: any) => {
            this.uploadError = err.message || 'File upload failed.';
            this.uploadSuccess = '';
            console.error('Upload error:', err);
          }
        });
    } else {
      this.uploadError = 'Please select a valid file before submitting.';
      console.error(this.uploadError);
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
      return throwError(`Error: ${error.error.message}`);
    } else {
      console.error('Server error:', error.status, error.message);
      return throwError(`Server Error: ${error.status}, ${error.message}`);
    }
  }
}