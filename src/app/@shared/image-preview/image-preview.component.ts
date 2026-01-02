import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
  standalone: false,
})
export class ImagePreviewComponent {
  @Input() public images: string[];

  @ViewChild('width')
  public width: ElementRef;

  public currentSliderIndex: number;
  public config: any;
  public defaultImg: string = './assets/img/not-available-img.png';

  constructor(public activeModal: NgbActiveModal) {
    this.config = {
      navigation: {
        prevEl: '.slider__arrow-prev',
        nextEl: '.slider__arrow-next',
      },
      centeredSlides: true,
      slidesPerView: 1,
      // loop: true,
      speed: 800,
      initialSlide: 1,
    };
    this.images = [];
    this.currentSliderIndex = 0;
  }

  public handleIndexChange($event: number) {
    this.currentSliderIndex = $event;
  }

  close() {
    this.activeModal.close();
  }
}
