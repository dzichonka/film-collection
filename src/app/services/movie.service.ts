import { computed, Injectable, resource, signal } from '@angular/core';
import { Movie } from '../types/movie.type';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseUrl = 'assets/films.json';
  readonly search = signal('');

  private readonly moviesResource = resource<Movie[], void>({
    loader: async ({ abortSignal }) => {
      await new Promise<void>((resolve, reject) => {
        const timeoutId = setTimeout(resolve, 2000);

        abortSignal.addEventListener('abort', () => {
          clearTimeout(timeoutId);
          reject(new DOMException('Aborted', 'AbortError'));
        });
      });

      const response = await fetch(this.baseUrl, {
        signal: abortSignal,
      });

      if (!response.ok) {
        throw new Error('Failed to load movies');
      }

      return response.json() as Promise<Movie[]>;
    },
  });

  readonly movies = computed(() => this.moviesResource.value() ?? []);

  getMovie(id: number): Movie | undefined {
    return this.movies().find((movie) => movie.id === id);
  }

  readonly favorites = computed(() => this.movies().filter((movie) => movie.isFavorite));

  readonly filteredMovies = computed(() => {
    const query = this.search().trim().toLowerCase();

    if (!query) {
      return this.movies();
    }

    return this.movies().filter((movie) => movie.title.toLowerCase().includes(query));
  });

  readonly isLoading = this.moviesResource.isLoading;
  readonly error = this.moviesResource.error;
  readonly status = this.moviesResource.status;

  updateSearch(value: string): void {
    this.search.set(value);
  }

  toggleFavorite(id: number): void {
    const updated = this.movies().map((movie) =>
      movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie,
    );

    this.moviesResource.set(updated);
  }

  reload(): void {
    this.moviesResource.reload();
  }
}
