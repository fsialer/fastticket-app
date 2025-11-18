import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { UserRegistration } from './features/user-registration/user-registration';
import { SignIn } from './features/sign-in/sign-in';
import { Home } from './features/home/home';
import { authGuard } from './core/guard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'register', component: UserRegistration },
      { path: 'signin', component: SignIn },
      {path: 'home', component: Home, canActivate:[authGuard]},
      { path: '', redirectTo: '/register', pathMatch: 'full' }
    ]
  }
];
