import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { Breadcrumb } from '../types/breadcrumb.type';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private router = inject(Router);
  private dynamicLabels = signal<Record<string, string>>({});

  private navigationEnd = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(() => this.router.routerState.snapshot.root),
    ),
  );

  readonly breadcrumbs = computed(() => {
    const root = this.navigationEnd();
    const dynamic = this.dynamicLabels();
    if (!root) return [];

    const breadcrumbs: Breadcrumb[] = [];
    this.addBreadcrumb(root, [], breadcrumbs, dynamic);
    return breadcrumbs;
  });

  setLabel(url: string, label: string) {
    this.dynamicLabels.update((prev: Record<string, string>) => ({ ...prev, [url]: label }));
  }

  private addBreadcrumb(
    route: ActivatedRouteSnapshot,
    parentUrl: string[],
    breadcrumbs: Breadcrumb[],
    dynamic: Record<string, string>,
  ) {
    const routeUrl = parentUrl.concat(route.url.map((url) => url.path));
    const fullPath = '/' + routeUrl.join('/');

    const label = dynamic[fullPath] || route.data['breadcrumb'];

    if (label) {
      const lastBc = breadcrumbs[breadcrumbs.length - 1];
      if (!lastBc || lastBc.url !== fullPath) {
        breadcrumbs.push({ label, url: fullPath });
      }
    }

    if (route.firstChild) {
      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs, dynamic);
    }
  }
}
