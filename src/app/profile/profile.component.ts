import { Component, OnInit } from '@angular/core';
import { User } from '../Customer/customer-data/User.model';
import { Router } from '@angular/router';
import {ProfileService} from './profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  user: User | null = null; // Original user data
  editedUser: User | null = null; // For editing
  isEditing: boolean = false;

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.profileService.getUserProfile().subscribe({
      next: (response) => {
        this.user = response;
        this.editedUser = { ...this.user }; // Initialize editedUser with user data
      },
      error: (err) => {
        console.error('Error fetching user profile', err);
      }
    });
  }

  editProfile(): void {
    this.isEditing = true; // Switch to editing mode
  }

  updateProfile(): void {
    if (this.editedUser) {
      this.profileService.updateUserProfile(this.editedUser).subscribe({
        next: () => {
          alert('Profile updated successfully');
          this.isEditing = false; // Switch back to view mode
          this.fetchUserProfile(); // Refresh the user data
        },
        error: (err) => {
          console.error('Error updating profile', err);
        }
      });
    }
  }
}
