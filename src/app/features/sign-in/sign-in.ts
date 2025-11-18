import { saveToken } from './../../core/utils/token';
import { Component, EventEmitter, Output } from '@angular/core';
import { Auth } from '../../core/models/auth.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { Token } from '../../core/models/token.model';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  @Output() userRegistered = new EventEmitter<Token>();

  showSuccess = false;
  successMessage = '';
  showError = false;
  errorMessage = '';

  auth: Auth = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  authUser() {
    this.showError = false;
    this.showSuccess = false;

    this.authService.authUser(this.auth).subscribe({
      next: (authenticatedUser) => {
        console.log(authenticatedUser)
        this.successMessage = `Welcome!!`;
        this.showSuccess = true;
        this.userRegistered.emit(authenticatedUser);
        saveToken(authenticatedUser.accessToken,authenticatedUser.refreshToken)
        this.goToHome();
        setTimeout(() => this.showSuccess = false, 5000);
      },
      error: (error) => {
        this.errorMessage = 'Occurred error in service.';
        if(error.error.details.length>0){
           if(error.error.details[0]=="USER_006"){
            this.errorMessage = 'Email not exists.';
          }
          if(error.error.details[0]=="USER_004"){
            this.errorMessage = 'Email not confirmed.';
          }
          if(error.error.details[0]=="USER_005"){
            this.errorMessage = 'Password is not valid.';
          }
        }
        this.showError = true;
        setTimeout(() => this.showError = false, 5000);
      }
    });
  }

  private resetForm() {
    this.auth = {
      email: '',
      password: ''
    };
  }

  goToRegister(){
    this.router.navigate(['/register'])
  }

  goToHome(){
    this.router.navigate(['/home'])
  }

}
