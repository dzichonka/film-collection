import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Movie } from '../../../types/movie.type';
import { Router } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'li[app-card]',
  imports: [NgClass],
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
  movieService = inject(MovieService);

  onMovieSelected(movieId: number): void {
    this.router.navigate(['/details', movieId]);
  }
  onFavoriteToggle(event: Event): void {
    event.stopPropagation();
    this.movieService.toggleFavorite(this.movie().id);
  }
}
