import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'button[app-back-btn]',
  imports: [],
  templateUrl: './back-btn.component.html',
  styleUrl: './back-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'link', '(click)': 'goBack()' },
})
export class BackBtnComponent {
  location = inject(Location);
  goBack() {
    this.location.back();
  }
}
