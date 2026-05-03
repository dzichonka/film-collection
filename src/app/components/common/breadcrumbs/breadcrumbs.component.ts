import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { Breadcrumb } from '../../../types/breadcrumb.type';
import { MovieService } from '../../../services/movie.service';
import { BreadcrumbService } from '../../../services/breadcrumb.service';

@Component({
  selector: 'nav[app-breadcrumbs]',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent {
  private breadcrumbService = inject(BreadcrumbService);
  breadcrumbs = this.breadcrumbService.breadcrumbs;
}
