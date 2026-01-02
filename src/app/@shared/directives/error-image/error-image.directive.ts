import { Attribute, Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[uiImageLoader]',
  standalone: false,
})
export class ErrorImageDirective {
  @Input() onErrorSrc: string;
  constructor(
    @Attribute('loader') public loader: string,
    // @Attribute('onErrorSrc') public onErrorSrc: string,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  @HostListener('error') onError() {
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.onErrorSrc);
  }
}
