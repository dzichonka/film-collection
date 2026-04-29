import { HttpClient } from '@angular/common/http';
import { inject, Injectable, resource, signal } from '@angular/core';
import { Movie } from '../types/movie.type';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  http = inject(HttpClient);
  baseUrl = 'assets/films.json';

  private readonly reloadVersion = signal(0);

  readonly movies = resource({
    params: () => ({
      version: this.reloadVersion(),
    }),
    loader: () => firstValueFrom(this.http.get<Movie[]>(this.baseUrl)),
  });
  getMovie(id: number) {
    return resource({
      loader: () =>
        firstValueFrom(
          this.http
            .get<Movie[]>(this.baseUrl)
            .pipe(map((movies) => movies.find((movie) => movie.id === id))),
        ),
    });
  }
  refreshMovies(): void {
    this.reloadVersion.update((v) => v + 1);
  }
}
