import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/user/user.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-registration.html',
  styleUrl: './user-registration.scss',
})
export class UserRegistration {
  @Output() userRegistered = new EventEmitter<User>();
  
  showSuccess = false;
  successMessage = '';
  showError = false;
  errorMessage = '';

  user: User = {
    email: '',
    password: '',
    name: '',
    lastName: '',
    sex: ''
  };

  constructor(private userService: UserService,private router: Router) {}

  registerUser() {
    this.showError = false;
    this.showSuccess = false;
    
    this.userService.registerUser(this.user).subscribe({
      next: (registeredUser) => {
        this.successMessage = `Your account has been successfully created!. Please, check your email to confirm your registration.`;
        this.showSuccess = true;
        this.userRegistered.emit(registeredUser);
        this.resetForm();
        setTimeout(() => this.showSuccess = false, 5000);
      },
      error: (error) => {
        this.errorMessage = 'Error al crear la cuenta. Por favor, intenta nuevamente.';
        this.showError = true;
        setTimeout(() => this.showError = false, 5000);
      }
    });
  }

  private resetForm() {
    this.user = {
      email: '',
      password: '',
      name: '',
      lastName: '',
      sex: ''
    };
  }

  goToSignIn() {
    console.log("paso")
    this.router.navigate(['/signin']);
  }
}
