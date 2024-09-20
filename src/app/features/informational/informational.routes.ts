import { Routes } from '@angular/router';

export const informationalRoutes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./pages/welcome-screen/welcome-screen.page').then(
        (m) => m.WelcomeScreenPage
      ),
  },
];
