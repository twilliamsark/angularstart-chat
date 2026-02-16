import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home'),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register'),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
