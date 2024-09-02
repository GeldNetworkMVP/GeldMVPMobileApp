import { Routes } from "@angular/router";

export const homeRoutes: Routes = [
    { path: 'home', loadComponent: () => import('./pages/home-screen/home-screen.page').then(m => m.HomeScreenPage) },
];