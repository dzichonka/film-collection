import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective {
  private readonly element = inject<ElementRef<HTMLInputElement>>(ElementRef);

  ngOnInit(): void {
    queueMicrotask(() => {
      this.element.nativeElement.focus();
    });
  }
}
