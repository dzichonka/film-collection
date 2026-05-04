import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { Router } from '@angular/router';
import { CardComponent } from '../../common/card/card.component';
import { LoaderComponent } from '../../common/loader/loader.component';
import { SearchComponent } from '../../common/search/search.component';

@Component({
  selector: 'section[app-home-page]',
  imports: [CardComponent, LoaderComponent, SearchComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'home-page container',
  },
})
export class HomePageComponent {
  movieService = inject(MovieService);
  router = inject(Router);
}
