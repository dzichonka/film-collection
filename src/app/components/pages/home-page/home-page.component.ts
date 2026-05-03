import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { Router } from '@angular/router';
import { CardComponent } from '../../common/card/card.component';

@Component({
  selector: 'app-home-page',
  imports: [CardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  movieService = inject(MovieService);
  router = inject(Router);

  movies = this.movieService.getAllMovies();

  onMovieSelected(movieId: number): void {
    this.router.navigate(['/details', movieId]);
  }
}
