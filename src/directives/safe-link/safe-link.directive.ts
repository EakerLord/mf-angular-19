import { Directive, ElementRef, inject, input } from '@angular/core';
@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)'
  }
})
export class SafeLinkDirective { // Atribute self directive

  routeParam = input('', {alias: 'appSafeLink'});
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Do you want to leave the app?');

    if (wantsToLeave) {
      const address = this.hostElementRef.nativeElement.href;
      // const address = (event.target as HTMLAnchorElement).href;
      this.hostElementRef.nativeElement.href = address + this.routeParam();
      // (event.target as HTMLAnchorElement).href = address + this.routeParam();
      return;
    }

    event?.preventDefault();
  }
}
