import { Routes } from "@angular/router";

export const profileRoutes: Routes = [
    { path: 'profile', loadComponent: () => import('./pages/view-profile/view-profile.page').then(m => m.ViewProfilePage) },
];