import { Component, computed, inject } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-details-page',
  imports: [],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent {
  movieService = inject(MovieService);
  private activatedRoute = inject(ActivatedRoute);
  private readonly params = toSignal(this.activatedRoute.params);

  readonly movieId = computed(() => Number(this.params()?.['movieId']));

  readonly movie = this.movieService.getMovie(this.movieId());
}
