import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';

import { PropertyType } from '@app/types/enums/SearchType.enum';
import { SearchType } from '@app/pages/home/types/SearchType.enum';
import { Router } from '@angular/router';
import { IAutocomplete } from '../../@shared/autocomplete/IAutocomplete';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user/user.service';
import { Title } from '@angular/platform-browser';
import news from '../../../assets/files/news.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('autosugestion') autosugestion: ElementRef;
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
  @ViewChild('width') public width: ElementRef;

  pauseOnHover = true;
  pauseOnFocus = true;

  public propertyType = PropertyType;
  public searchType: SearchType;
  public query: IAutocomplete;
  public selectedSearchItem: string;
  public autosugestionString: string;
  public autosugestionModel: string;
  public chunkNews: any = [];
  public paused: boolean;
  public perChunk = 3;
  public newsCopy: any = [];

  @Output()
  public searchTypeEmiter = new EventEmitter<SearchType>();

  constructor(
    private readonly router: Router,
    private userService: UserService,
    private titleService: Title,
  ) {
    this.searchType = SearchType.Sale;
  }

  ngOnInit() {
    this.titleService.setTitle(`Home | Conquest`);
  }

  public switchPropertyType(el: HTMLElement): void {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  ngAfterViewInit() {
    fromEvent(this.autosugestion.nativeElement, 'input')
      .pipe(map((event: Event) => (event.target as HTMLInputElement).value))
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe((data) => {
        this.autosugestionString = data;
      });

    this.checkWidth();
    this.getNews();
  }

  public switchSearchType(): void {
    this.searchType = this.searchType === SearchType.Sale ? SearchType.Rent : SearchType.Sale;
    this.searchTypeEmiter.emit(this.searchType);
  }

  public get searchTypeText(): string {
    return this.searchType === SearchType.Rent ? 'Rent' : 'Sale';
  }

  public selectSearchItem($event: IAutocomplete): void {
    this.query = $event;
    !this.query.sale_or_rental ? (this.query.sale_or_rental = 'S') : '';
    const search =
      this.query.type === 'Places'
        ? this.query.place_name
        : this.query.type === 'Region'
          ? this.query.region
          : this.query.type === 'Address'
            ? this.query.apartment_key
            : this.query.type === 'Cities'
              ? this.query.city
              : this.query.type === 'Zip'
                ? this.query.zip
                : this.query.type === 'Buildings'
                  ? this.query.building_key
                  : '';
    if (this.query.type === 'Buildings') {
      this.router.navigate(['/building'], {
        queryParams: { type: 'Buildings', search: this.query.building_key, address: this.query.address },
      });
    } else if (this.query.type === 'Address') {
      this.router.navigate(['/apartment'], { queryParams: { id: search, address: this.query.address } });
    } else {
      this.router.navigate(['/search'], {
        queryParams: { salesOrRental: this.query.sale_or_rental, type: this.query.type, search: search },
      });
    }
  }

  getNews() {
    this.newsCopy = [...news];
    this.chunkNews = news.reduce((resultArray: any, item: any, index: number) => {
      const chunkIndex = Math.floor(index / this.perChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  @HostListener('window:resize', ['$event'])
  public clickOut($event: any) {
    this.checkWidth();
  }

  public checkWidth(): void {
    if (this.width.nativeElement.offsetWidth > 1200) {
      this.perChunk = 4;
      return;
    }
    if (this.width.nativeElement.offsetWidth > 600 && this.width.nativeElement.offsetWidth < 1200) {
      this.perChunk = 3;
      return;
    }
    if (this.width.nativeElement.offsetWidth < 600) {
      this.perChunk = 1;
    }
    if (!!this.newsCopy) {
      this.chunkNews = this.newsCopy.reduce((resultArray: any, item: any, index: number) => {
        const chunkIndex = Math.floor(index / this.perChunk);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      }, []);
    }
  }
}
