import { Routes } from '@angular/router';

export const authenticationRoutes: Routes = [
  { path: '', redirectTo: 'login-or-register', pathMatch: 'full' },
  {
    path: 'login-or-register',
    loadComponent: () =>
      import('./pages/login-or-register/login-or-register.page').then(
        (m) => m.LoginOrRegisterPage
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
];
