import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Movie } from '../../../types/movie.type';
import { Router } from '@angular/router';

@Component({
  selector: 'li[app-card]',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'onMovieSelected(movie().id)',
  },
})
export class CardComponent {
  movie = input.required<Movie>();
  router = inject(Router);

  onMovieSelected(movieId: number): void {
    this.router.navigate(['/details', movieId]);
  }
}
