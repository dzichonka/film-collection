import { Component, inject } from '@angular/core';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  movieService = inject(MovieService);
}
