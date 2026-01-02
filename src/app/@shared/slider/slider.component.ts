import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  standalone: false,
})
export class SliderComponent implements OnInit {
  @Input()
  public images: string[] = [];

  @Input()
  public statusCode: string | number | null = null;

  @ViewChild('width')
  public width: ElementRef;

  public currentSliderIndex: number = 1;
  public config: any;
  public defaultImg: string = './assets/img/not-available-img.png';
  public watermarkImg: string;
  private modalOption: NgbModalOptions = {};

  constructor(private modalService: NgbModal) {
    this.config = {
      navigation: {
        prevEl: '.slider__arrow-prev',
        nextEl: '.slider__arrow-next',
      },
      centeredSlides: true,
      slidesPerView: 1,
      observer: true,
      loop: true,
      speed: 600,
      initialSlide: 1,
      spaceBetween: 3,
      breakpoints: {
        2000: {
          slidesPerView: 5,
          initialSlide: 2,
        },
        1000: {
          slidesPerView: 3,
          initialSlide: 1,
        },
        600: {
          slidesPerView: 1,
          initialSlide: 0,
        },
      },
    };
    this.images = [];
    this.currentSliderIndex = 0;
  }

  ngOnInit(): void {}

  public handleIndexChange($event: number) {
    this.currentSliderIndex = $event;
  }

  public openModal() {
    let modalOptions: NgbModalOptions = {
      size: 'xl',
    };
    const modalRef = this.modalService.open(ImagePreviewComponent, modalOptions);
    modalRef.componentInstance.images = this.images;
  }

  public getWatermark(): boolean {
    if (this.statusCode) {
      switch (this.statusCode) {
        case 100: {
          return false;
        }
        case 200:
        case 240:
        case 300:
        case 600:
        case 640: {
          this.watermarkImg = `./assets/img/perm_off_mkt.png`;
          return true;
        }
        case 400: {
          this.watermarkImg = `./assets/img/rented.png`;
          return true;
        }
        case 500: {
          this.watermarkImg = `./assets/img/sold.png`;
          return true;
        }
      }
    } else {
      return false;
    }
  }
  getCurrentSliderIndex() {
    return `${this.currentSliderIndex + 1} / ${this.images?.length}`;
  }
}
