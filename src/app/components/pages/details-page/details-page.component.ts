import { Component, computed, inject, ChangeDetectionStrategy, effect } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreadcrumbService } from '../../../services/breadcrumb.service';

@Component({
  selector: 'section[app-details-page]',
  imports: [],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'details-page container',
  },
})
export class DetailsPageComponent {
  movieService = inject(MovieService);
  breadcrumbService = inject(BreadcrumbService);
  router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private readonly params = toSignal(this.activatedRoute.params);

  readonly movieId = computed(() => Number(this.params()?.['movieId']));
  movieResource = this.movieService.getMovie(this.movieId());

  constructor() {
    effect(() => {
      const movie = this.movieResource.value();
      if (movie) {
        const currentUrl = this.router.url;
        this.breadcrumbService.setLabel(currentUrl, movie.title);
      }
    });
  }
}
