import { Routes } from "@angular/router";
import { informationalRoutes } from "@informational/informational.routes";
import {homeRoutes} from '@home/home.routes'

export const appRoutes: Routes = [
    ...homeRoutes,
    ...informationalRoutes
];