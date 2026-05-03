import {
  Component,
  computed,
  inject,
  ChangeDetectionStrategy,
  effect,
  signal,
} from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreadcrumbService } from '../../../services/breadcrumb.service';
import { BackBtnComponent } from '../../common/back-btn/back-btn.component';
import { LoaderComponent } from '../../common/loader/loader.component';
import { DurationPipe } from '../../../pipes/duration.pipe';

@Component({
  selector: 'section[app-details-page]',
  imports: [BackBtnComponent, LoaderComponent, DurationPipe],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'details-page container',
  },
})
export class DetailsPageComponent {
  movieService = inject(MovieService);
  router = inject(Router);
  private readonly breadcrumbService = inject(BreadcrumbService);

  private activatedRoute = inject(ActivatedRoute);
  private readonly params = toSignal(this.activatedRoute.params);

  readonly movieId = computed(() => Number(this.params()?.['movieId']));
  readonly movie = computed(() => this.movieService.getMovie(this.movieId()));

  constructor() {
    effect(() => {
      const movie = this.movie();
      if (movie) {
        const currentUrl = this.router.url;
        this.breadcrumbService.setLabel(currentUrl, movie.title);
      }
    });
  }
}
