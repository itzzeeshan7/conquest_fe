import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { googleMapStyles } from '@app/constants/google-maps.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { IAutocomplete } from '../../@shared/autocomplete/IAutocomplete';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ISearchData, ISearchResponse } from './ISearchData';
import { GoogleMap } from '@angular/google-maps';
import { from, fromEvent, Observable } from 'rxjs';
import { IButtonFilters, IPropertyFilter, IPropertyService, ISearchFilters } from './ISearchFilters';
import { UtilService } from '../../@shared/util/util.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '@app/pages/auth/actions/reducer/auth.reducers';
import * as fromAuth from '@app/pages/auth/actions/reducer/index';
import { IQueryFilter, QueryFilter } from './QueryFilter';

declare var google: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild(GoogleMap) public googleMap: GoogleMap;
  @ViewChild('autosugestion') autosugestion: ElementRef;

  public lat = 40.73061;
  public lng = -73.935242;
  public readonly mapStyles = googleMapStyles;
  public markers: any[];
  public showFilters: boolean;
  public isGridMode: boolean;
  public showListings: boolean = true;
  public items: ISearchData[] = [];
  public itemsChunk: ISearchData[] = [];
  public copyItems: ISearchData[] = [];
  public searchType: string;
  public searchBy: string;
  public searchQuery: string;
  public query: IAutocomplete;
  public sortBy: string = 'Newest';
  public filterByPriceMin: any;
  public filterByPriceMax: any;
  public filterByPriceValuesMin: any;
  public filterByPriceValuesMax: any;
  public totalResults: number;
  public minPrice: number;
  public maxPrice: number;
  public isCollapsed = false;
  public autosugestionString: string;
  public autosugestionModel: string;
  public isAuthenticate: boolean;
  public queryFilter: IQueryFilter;
  public visibleListingNo: number = 0;
  mobileView: boolean = false;
  public markerIcon = {
    url: './assets/img/pointer.svg',
    scaledSize: {
      width: 20,
      height: 30,
    },
  };

  @ViewChild('listingGrid', { read: ElementRef, static: false })
  public listingGrid: ElementRef;

  @ViewChild('width')
  public width: ElementRef;

  infoWindowOpened: any = null;
  previousInfoWindow: any = null;

  clulster_max_zoom = 18;
  minClusterSize = 8;
  mapOptions = {
    styles: [
      {
        url: './assets/images/cluster.png',
        width: 70,
        height: 50,
        textColor: 'rED',
        fontWeight: 'bold',
        textSize: '14px',
        fontFamily: 'nunito',
        lineHeight: '12px',
        paddingTop: '8px',
        backgroundSize: 'cover',
      },
    ],
    calculator: (markers: any) => {
      for (let i = 0; i < markers.length; i++) {
        // you have access all the markers from each cluster
      }
      return {
        text: markers.length + ' MARKERS',
        index: 1,
      };
      // index: 1 -> for green icon
      // index: 2 -> for red icon
    },
  };

  openedWindow: number = -1;

  chunk: number = 3;

  virtualScrollStyle: any = {};
  zoom: number = 8;
  step: number;
  public otherFilters: ISearchFilters = {
    propertyFilters: [
      {
        property: 'priceSqf',
        min: null as number,
        max: null as number,
        name: 'Price/FT',
        sup: '2',
        step: 500,
      },
      {
        property: 'monthlies',
        min: null as number,
        max: null as number,
        name: 'Monthlies',
        step: 500,
      },
      // {
      //   property: 'max_financing_pct',
      //   From: null as number,
      //   To: null as number,
      //   name: 'Persent Financing',
      // },
      {
        property: 'totalRooms',
        min: null as number,
        max: null as number,
        name: 'Total rooms',
        step: 1,
      },
      {
        property: 'sqft',
        min: null as number,
        max: null as number,
        name: 'Square Feet',
        step: 500,
      },
      // {
      //   property: 'width',
      //   From: null as number,
      //   To: null as number,
      //   name: 'Building Width',
      // },
      {
        property: 'yearBuilt',
        min: null as number,
        max: null as number,
        name: 'Year Built',
        step: 1000,
      },
    ],
    propertyServices: [
      {
        property: 'doorman',
        name: 'Doorman',
        value: null as boolean,
      },
      {
        property: 'gym',
        name: 'Gym',
        value: null as boolean,
      },
      {
        property: 'garage',
        name: 'Garage',
        value: null as boolean,
      },
      {
        property: 'pool',
        name: 'Pool',
        value: null as boolean,
      },
      {
        property: 'elevator',
        name: 'Elevator',
        value: null as boolean,
      },
      {
        property: 'pets',
        name: 'Pets',
        value: null as boolean,
      },
      {
        property: 'washerDayer',
        name: 'Washer Dryer',
        value: null as boolean,
      },
      {
        property: 'prewar',
        name: 'Prewar',
        value: null as boolean,
      },
      {
        property: 'rooftop',
        name: 'Rooftop',
        value: null as boolean,
      },
      // {
      //   property: 'has_fireplace',
      //   name: 'Fireplace',
      //   value: null as boolean,
      // },
      {
        property: 'outdorSpace',
        name: 'Outdoor Space',
        value: null as boolean,
      },
      {
        property: 'buildingLaundry',
        name: 'Building Laundry',
        value: null as boolean,
      },
      {
        property: 'newDevelopment',
        name: 'New Development',
        value: null as boolean,
      },
    ],
    buttonFilters: {
      sales: true,
      rental: false,
      condo: false,
      coop: false,
      condop: false,
      single: false,
      multi: false,
      commercial: false,
    },
  };
  private serverUrl = environment.serverUrl;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private http: HttpClient,
    public readonly util: UtilService,
    private readonly store: Store<State>,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.queryFilter = params as QueryFilter;
      this.queryFilter = { ...this.queryFilter };
    });
    this.showFilters = false;
    this.isGridMode = false;
    this.filterByPriceMax = 0;
    this.filterByPriceMin = 0;
  }

  ngOnInit(): void {
    this.store.select(fromAuth.getLoggedIn).subscribe((isAuth: boolean) => {
      this.isAuthenticate = isAuth;
    });
  }

  ngAfterViewInit() {
    this.checkWidth();
    this.fetchData();
    if (this.googleMap) {
      this.googleMap.mapInitialized.subscribe((map: any) => {
        map.setZoom(12);
      });
    }

    this.updateListingGridViewport();

    fromEvent(this.autosugestion.nativeElement, 'input')
      .pipe(map((event: Event) => (event.target as HTMLInputElement).value))
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe((data) => {
        this.autosugestionString = data;
      });
    this.cdRef.detectChanges();
  }

  public toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  public clearQuery(): void {
    this.autosugestionModel = null;
  }

  public handleAutocompleteSelect($event: IAutocomplete): void {
    this.query = $event;
    const search =
      this.query.type === 'Places'
        ? this.query.place_name
        : this.query.type === 'Region'
          ? this.query.region
          : this.query.type === 'Address'
            ? this.query.address
            : this.query.type === 'Cities'
              ? this.query.city
              : this.query.type === 'Zip'
                ? this.query.zip
                : this.query.type === 'Buildings'
                  ? this.query.building_name
                  : '';
    if (this.query.type === 'Buildings') {
      this.router.navigate(['/building'], {
        queryParams: { type: 'Buildings', search: this.query.building_key, address: this.query.address },
      });
    } else if (this.query.type === 'Address') {
      this.router.navigate(['/apartment'], { queryParams: { id: search, address: this.query.address } });
    } else {
      this.router.navigate(['/search'], {
        queryParams: { salesOrRental: this.queryFilter.salesOrRental, type: this.query.type, search: search },
      });
      const salesOrRental = this.queryFilter.salesOrRental;
      this.queryFilter = new QueryFilter();
      this.queryFilter.search = search;
      this.queryFilter.salesOrRental = salesOrRental;
      this.queryFilter.type = this.query.type;
      this.fetchData();
    }
  }

  public goToApartmentPage(apartament: ISearchData): void {
    this.router.navigate(['/apartment'], {
      queryParams: {
        id: apartament.id,
        address: apartament.address_with_unit,
      },
    });
  }

  private fetchData() {
    if (this.queryFilter.search == '') {
      return;
    }

    this.items = [];

    let httpParams = new HttpParams();
    Object.keys(this.queryFilter).forEach((key) => {
      // @ts-ignore
      httpParams = httpParams.append(key, this.queryFilter[key]);
    });
    this.http
      .get(`${this.serverUrl}/listings/searchQuery`, { params: httpParams })
      .subscribe((response: ISearchResponse) => {
        this.autosugestionModel = this.queryFilter.search;
        this.copyItems = [...response.searchData];
        this.items = response.searchData;
        this.filterByPriceValuesMin = this.generatePriceFilterValues(
          +response.minMaxPrice.min,
          +response.minMaxPrice.max,
          'min',
        );
        this.filterByPriceValuesMax = this.generatePriceFilterValues(
          +response.minMaxPrice.min,
          +response.minMaxPrice.max,
          'max',
        );
        this.totalResults = response.totalResults;
        if (this.queryFilter.priceTo) {
          this.filterByPriceMax = +this.queryFilter.priceTo;
        }
        if (this.queryFilter.priceFrom) {
          this.filterByPriceMin = +this.queryFilter.priceFrom;
        }
        this.colectMarkers();
        // this.geocode(this.items[0].place_name + ', New York, USA');
        this.sortListBy(this.sortBy);
      });
  }

  private generatePriceFilterValues(min: number, max: number, type: string) {
    const priceFiltervalues = [];

    if (type == 'min') {
      const obj = {
        value: 0,
        formmated: 'No Min Price',
      };
      priceFiltervalues.push(obj);
    } else {
      const obj = {
        value: 0,
        formmated: 'No Max Price',
      };
      priceFiltervalues.push(obj);
    }
    let num = min;
    while (num < max + 5000000) {
      const obj = {
        value: 0,
        formmated: '',
      };
      obj.value = num;
      obj.formmated = this.formatNumbers(num).toString();
      priceFiltervalues.push(obj);
      if (num < 1000000) {
        num += 250000;
        continue;
      }
      if (num >= 1000000 && num <= 10000000) {
        num += 500000;
        continue;
      }
      if (num > 10000000) {
        num += 1000000;
        continue;
      }
    }
    return priceFiltervalues;
  }

  public sortListBy(value: string, items: ISearchData[] = []) {
    this.sortBy = value;
    switch (value) {
      case 'Newest':
        this.items = this.items.sort((a, b) => {
          return new Date(b.list_date).getTime() - new Date(a.list_date).getTime();
        });
        break;
      case 'Oldest':
        this.items = this.items.sort((a, b) => {
          return new Date(a.list_date).getTime() - new Date(b.list_date).getTime();
        });
        break;
      case 'Price lowest':
        this.items = this.items.sort((a, b) => {
          return a.listing_price - b.listing_price;
        });
        break;
      case 'Price highest':
        this.items = this.items.sort((a, b) => {
          return b.listing_price - a.listing_price;
        });
        break;
    }
    if (items.length > 0) {
      this.itemsChunk = this.util.chunkArray([...items], this.chunk);
      this.visibleListingNo = items.length;
    } else {
      this.itemsChunk = this.util.chunkArray([...this.items], this.chunk);
      this.visibleListingNo = this.items.length;
    }
  }

  public changeFilterByPriceFromFilter(event: any) {
    const { from, to, reload } = event;
    this.changeFilterByPrice(from, to, reload);
  }

  public changeBedsBathsFilterChange(event: any) {
    const { from, to, bedrooms } = event;
    this.changeFilterByBedroomsBaths(from, to, bedrooms);
  }

  public changeFilterByPrice(from: any, to: any, reload: boolean) {
    if (from) {
      this.queryFilter.priceFrom = +from;
    } else {
      this.filterByPriceMin = 0;
      if (this.queryFilter.priceFrom) {
        delete this.queryFilter.priceFrom;
      }
    }
    if (to) {
      this.queryFilter.priceTo = +to;
    } else {
      this.filterByPriceMax = 0;
      if (this.queryFilter.priceTo) {
        delete this.queryFilter.priceTo;
      }
    }
    if (reload) {
      this.routeNavigate(this.queryFilter);
    }
  }

  public changeFilterByBedroomsBaths(from: number, to: number, bedrooms: boolean) {
    if (bedrooms) {
      if (from) {
        if (from == 5) {
          this.queryFilter.bedroomsFrom = 0;
        } else {
          this.queryFilter.bedroomsFrom = +from;
        }
      } else {
        if (this.queryFilter.bedroomsFrom) {
          delete this.queryFilter.bedroomsFrom;
        }
      }
      if (to) {
        if (to == 5) {
          this.queryFilter.bedroomsTo = 0;
        } else {
          this.queryFilter.bedroomsTo = +to;
        }
      } else {
        if (this.queryFilter.bedroomsTo) {
          delete this.queryFilter.bedroomsTo;
        }
      }
    } else {
      if (from) {
        this.queryFilter.bathroomsFrom = +from;
      } else {
        if (this.queryFilter.bathroomsFrom) {
          delete this.queryFilter.bathroomsFrom;
        }
      }
      if (to) {
        this.queryFilter.bathroomsTo = +to;
      } else {
        if (this.queryFilter.bathroomsTo) {
          delete this.queryFilter.bathroomsTo;
        }
      }
    }
    this.routeNavigate(this.queryFilter);
  }

  public propertyFilterChange(event: IPropertyFilter[]) {
    // this.items = this.items.filter((el) => {
    //   return el[event.property] >= event.min && el[event.property] <= event.max;
    // });
    // this.colectMarkers();
    event.forEach((item) => {
      // @ts-ignore
      this.queryFilter[item.property + 'From'] = item.min;
      // @ts-ignore
      this.queryFilter[item.property + 'To'] = item.max;
    });
    this.routeNavigate(this.queryFilter);
  }

  public propertyServicesChange(event: IPropertyService[]) {
    event.forEach((item) => {
      // @ts-ignore
      this.queryFilter[item.property] = item.value;
    });
    this.routeNavigate(this.queryFilter);
  }

  public buttonServiceChange(event: IButtonFilters) {
    this.queryFilter.salesOrRental = event.sales ? 'S' : 'R';
    this.queryFilter.propertyType = [];
    Object.keys(event).forEach((item) => {
      switch (item) {
        case 'condo':
          if (event[item]) {
            this.queryFilter.propertyType.push('540');
          }
          break;
        case 'coop':
          if (event[item]) {
            this.queryFilter.propertyType.push('550');
          }
          break;
        case 'commercial':
          if (event[item]) {
            this.queryFilter.propertyType.push('100');
          }
          break;
        case 'multi':
          if (event[item]) {
            this.queryFilter.propertyType.push('580');
          }
          break;
        case 'single':
          if (event[item]) {
            this.queryFilter.propertyType.push('560');
          }
          break;
        case 'condop':
          if (event[item]) {
            this.queryFilter.propertyType.push('530');
          }
          break;
      }
    });
    this.routeNavigate(this.queryFilter);
  }

  public resetFilters(event: boolean) {
    if (event) {
      Object.keys(this.queryFilter).forEach((key) => {
        if (key != 'salesOrRental' && key != 'search' && key != 'type') {
          // @ts-ignore
          delete this.queryFilter[key];
        }
      });
      this.routeNavigate(this.queryFilter);
    }
  }

  private formatNumbers = (n: number) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
  };

  // private geocode(place: string) {
  //   return this.googleLoaded.subscribe((val) => {
  //     if (val) {
  //       const geocoder = new google.maps.Geocoder();
  //       return new Promise((resolve, reject) => {
  //         geocoder.geocode(
  //           {
  //             address: place,
  //           },
  //           (results: any, status: any) => {
  //             if (status === google.maps.GeocoderStatus.OK) {
  //               // resolve(results[0]);
  //               this.lat = results[0]['geometry'].location.lat();
  //               this.lng = results[0]['geometry'].location.lng();
  //             } else {
  //               reject(new Error(status));
  //             }
  //           }
  //         );
  //       });
  //     }
  //   });
  // }

  private colectMarkers() {
    this.markers = [];

    this.items.forEach((el: ISearchData, index: number) => {
      if (index === 0) {
        this.lng = +el.combined_latitude;
        this.lat = +el.combined_longitude;
      }
      var marker = {
        lat: +el.combined_latitude,
        lng: +el.combined_longitude,
        // label: '$ ' + el.listing_price_formatted
        item: el,
      };
      this.markers.push(marker);
    });
  }

  private routeNavigate(queryFilter: QueryFilter) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryFilter,
      // queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    this.fetchData();
  }

  @HostListener('window:resize', ['$event'])
  public clickOut($event: any) {
    this.checkWidth();
  }

  public checkWidth(): void {
    this.mobileView = false;
    if (this.width.nativeElement.offsetWidth > 1199) {
      this.chunk = 3;
    } else if (this.width.nativeElement.offsetWidth > 740) {
      if (this.width.nativeElement.offsetWidth < 993) {
        this.mobileView = true;
      }
      this.chunk = 2;
    } else {
      this.chunk = 2;
      this.mobileView = true;
    }

    this.updateListingGridViewport();

    if (this.items.length > 0) {
      this.itemsChunk = this.util.chunkArray([...this.items], this.chunk);
    }
  }

  clickedMarker(index: number) {
    this.openedWindow = index;
  }

  isInfoWindowOpen(index: number) {
    return this.openedWindow == index;
  }

  close_window() {
    if (this.previousInfoWindow != null) {
      this.previousInfoWindow.isOpen = false;
    }
  }

  select_marker(infoWindow: any) {
    if (this.previousInfoWindow == null) this.previousInfoWindow = infoWindow;
    else {
      this.infoWindowOpened = infoWindow;
      this.previousInfoWindow.isOpen = false;
    }
    this.previousInfoWindow = infoWindow;
  }

  boundsChange(event: any) {
    if (this.markers) {
      const displayedMarkers = this.markers.filter((marker) => event.contains(marker)).map((marker) => marker.item);
      this.sortListBy(this.sortBy, displayedMarkers);
    }
  }

  updateListingGridViewport() {
    if (this.listingGrid.nativeElement.offsetHeight) {
      this.virtualScrollStyle = {
        height: this.listingGrid.nativeElement.offsetHeight + 'px',
        width: this.listingGrid.nativeElement.offsetWidth + 'px',
      };
    }
  }
}
