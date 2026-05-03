import { Injectable, resource, signal } from '@angular/core';
import { Movie } from '../types/movie.type';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseUrl = 'assets/films.json';

  private readonly reloadVersion = signal(0);

  getAllMovies() {
    return resource({
      params: () => ({
        version: this.reloadVersion(),
      }),
      loader: () => fetch(this.baseUrl).then((res) => res.json() as Promise<Movie[]>),
    });
  }

  getMovie(id: number) {
    return resource({
      loader: async () => {
        const movies = await fetch(this.baseUrl).then((res) => res.json() as Promise<Movie[]>);
        const movie = movies.find((movie) => movie.id === id);
        if (!movie) {
          throw new Error(`Movie with id ${id} not found`);
        }
        return movie;
      },
    });
  }
  refreshMovies(): void {
    this.reloadVersion.update((v) => v + 1);
  }
}
