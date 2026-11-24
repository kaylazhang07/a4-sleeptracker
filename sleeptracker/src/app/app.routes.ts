import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'history',
        loadComponent: () => import('./history/history.page').then((m) => m.HistoryPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'log-overnight',
    loadComponent: () => import('./log-overnight/log-overnight.page').then( m => m.LogOvernightPage)
  },
  {
    path: 'log-sleepiness',
    loadComponent: () => import('./log-sleepiness/log-sleepiness.page').then( m => m.LogSleepinessPage)
  },
];
