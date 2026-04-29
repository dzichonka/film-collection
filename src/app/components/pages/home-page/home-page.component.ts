import { Component, inject } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  movieService = inject(MovieService);
  router = inject(Router);

  movies = this.movieService.getAllMovies();

  onMovieSelected(movieId: number): void {
    this.router.navigate([movieId]);
  }
}
