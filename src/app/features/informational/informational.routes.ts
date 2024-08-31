import { Routes } from "@angular/router";

export const informationalRoutes: Routes = [
    { path: 'welcome', loadComponent: () => import('./pages/welcome-screen/welcome-screen.page').then(m => m.WelcomeScreenPage) },
];