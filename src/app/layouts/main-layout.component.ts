import { clearToken, isLogged } from './../core/utils/token';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet],
  templateUrl: "./main-layout.html",
  styleUrl: "./main-layout.scss"
})
export class MainLayoutComponent {
  constructor(private router: Router) { }

  get isLogged(): boolean {
    return isLogged();
  }

  goToSignIn() {
    this.router.navigate(['/signin']);
  }

  signOut() {
    clearToken()
    this.router.navigate(['/signin']);
  }
}