import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { UserRegistration } from './features/user-registration/user-registration';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'register', component: UserRegistration },
      { path: '', redirectTo: '/register', pathMatch: 'full' }
    ]
  }
];
