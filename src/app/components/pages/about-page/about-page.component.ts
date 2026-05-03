import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'section[app-about-page]',
  imports: [],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'about-page container',
  },
})
export class AboutPageComponent {}
