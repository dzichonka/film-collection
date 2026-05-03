import { Routes } from '@angular/router';
import { LayoutComponent } from './components/common/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            data: { breadcrumb: 'Home' },
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./components/pages/home-page/home-page.component').then(
                    (m) => m.HomePageComponent,
                  ),
              },
              {
                path: 'details/:movieId',
                data: { breadcrumb: 'Movie' },
                loadComponent: () =>
                  import('./components/pages/details-page/details-page.component').then(
                    (m) => m.DetailsPageComponent,
                  ),
              },
            ],
          },
        ],
      },
      {
        path: 'about',
        data: { breadcrumb: 'About' },
        loadComponent: () =>
          import('./components/pages/about-page/about-page.component').then(
            (m) => m.AboutPageComponent,
          ),
      },
      {
        path: '**',
        data: { breadcrumb: 'Not Found' },

        loadComponent: () =>
          import('./components/pages/not-found-page/not-found-page.component').then(
            (m) => m.NotFoundPageComponent,
          ),
      },
    ],
  },
];
