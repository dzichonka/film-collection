import { Routes } from '@angular/router';
import { LayoutComponent } from './components/pages/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./components/pages/home-page/home-page.component').then(
            (m) => m.HomePageComponent,
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        //   path: ':movieId',
        path: 'details',
        loadComponent: () =>
          import('./components/pages/details-page/details-page.component').then(
            (m) => m.DetailsPageComponent,
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./components/pages/not-found-page/not-found-page.component').then(
            (m) => m.NotFoundPageComponent,
          ),
      },
    ],
  },
];
