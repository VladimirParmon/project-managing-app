import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { thresholdForHeaderColorChangeInPX } from '../constants/UIConstants';

@Directive({
  selector: '[appHeaderScroll]',
})
export class HeaderScrollDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @HostListener('window: scroll', [])
  onScroll() {
    const pixelsFromTheTopOfThePage =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (pixelsFromTheTopOfThePage > thresholdForHeaderColorChangeInPX) {
      this.renderer.removeClass(this.el.nativeElement, 'header__opacity');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'header__opacity');
    }
  }
}
