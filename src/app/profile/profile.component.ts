import { Component, OnInit } from '@angular/core';
import { User } from '../Customer/customer-data/User.model'; // Ensure correct import
import { ApiResponse } from '.././Payment/mark-cash/ApiResponse.model'; // Import the ApiResponse interface
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [ProfileService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'] // Corrected to styleUrls
})
export class ProfileComponent implements OnInit {

  user: User = {
    userId: '',
    name: '',
    email: '',
    phNo: '',
    address: '',
    meterNumber: '',
    isActive: false,
    isBlocked: false,
    wallet: {
      balance: 0,
      walletId: ''
    }
  }; // Initialize user

  editedUser: User = {
    userId: '',
    name: '',
    email: '',
    phNo: '',
    address: '',
    meterNumber: '',
    isActive: false,
    isBlocked: false,
    wallet: {
      balance: 0,
      walletId: ''
    }
  }; // For editing

  isEditing: boolean = false;

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.profileService.getUserProfile().subscribe({
      next: (response: ApiResponse<User>) => { // Use ApiResponse<User> here
        console.log('User profile fetched:', response); // Log the response
        if (response.data) { // Check if data exists
          this.user = response.data; // Extract user data from the response
          this.editedUser = { ...this.user }; // Initialize editedUser with user data
        } else {
          console.error('No user data found in response');
        }
      },
      error: (err) => {
        console.error('Error fetching user profile', err);
        alert('Could not fetch user profile. Please check your credentials or contact support.');
      }
    });
  }

  editProfile(): void {
    this.isEditing = true; // Switch to editing mode
  }

  updateProfile(): void {
    if (this.editedUser) {
        this.profileService.updateUserProfile(this.editedUser).subscribe({
            next: (response) => { // Log the response from the update call
                console.log('Update response:', response);
                alert('Profile updated successfully');
                this.isEditing = false; // Switch back to view mode
                this.fetchUserProfile(); // Refresh the user data
            },
            error: (err) => {
                console.error('Error updating profile', err);
                alert('Error updating profile. Please try again later.');
            }
        });
    }
}

}
