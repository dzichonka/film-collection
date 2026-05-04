import { ChangeDetectionStrategy, Component, output, input } from '@angular/core';
import { AutofocusDirective } from '../../../directives/autofocus.directive';

@Component({
  selector: 'app-search',
  imports: [AutofocusDirective],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  readonly value = input.required<string>();
  readonly valueChange = output<string>();
}
