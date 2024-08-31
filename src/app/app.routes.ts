import { Routes } from "@angular/router";
import { informationalRoutes } from "@informational/informational.routes";

export const appRoutes: Routes = [
    { path: 'home', loadComponent: () => import('@home/home.page').then(m => m.HomePage) },
    ...informationalRoutes
];