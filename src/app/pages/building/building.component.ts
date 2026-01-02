import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IUIFact } from '@shared/facts/facts.component';
import { IUIBuildingCard } from '@shared/building-card/building-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GoogleMap } from '@angular/google-maps';
import { Amenties } from './Amenities.enum';
import { UtilService } from '../../@shared/util/util.service';
import { googleMapStyles } from '../../constants/google-maps.constants';
import { IBreadcrumbs } from '../../@shared/breadcrumbs/IBreadcrumbs';
import { IUIMapsPlace } from '../../@shared/maps/maps.component';
import { IAutocomplete } from '../../@shared/autocomplete/IAutocomplete';
import { SearchType } from '../home/types/SearchType.enum';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import * as fromAuth from '@app/pages/auth/actions/reducer/index';
import { Store } from '@ngrx/store';
import { State } from '@app/pages/auth/actions/reducer/auth.reducers';
import { BuildingAmenities } from './buildingAmenties';
import { BuildingDetails, IBudildingDetails } from './buildingDetails';
import { IBuildingData } from './buildingData';
import { Title } from '@angular/platform-browser';
import { MarkerType } from '../../@shared/maps/MarkerType.enum';

declare var google: any;

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss'],
  standalone: false,
})
export class BuildingComponent implements OnInit, AfterViewInit {
  @ViewChild(GoogleMap) googleMap: GoogleMap;
  @ViewChild('streetviewMap') streetviewMap: any;
  @ViewChild('streetviewPano') streetviewPano: any;
  @ViewChild('autosugestion') autosugestion: ElementRef;

  public readonly mapStyles = googleMapStyles;
  public images: string[] = [];
  public facts: IUIFact[];
  // public activeListings: IBuildingHistoryItem[];
  // public pastSales: IBuildingHistoryItem[];
  // public pastRentals: IBuildingHistoryItem[];
  public similarBuildings: IUIBuildingCard[];
  public amenities: string[];
  public newAmenities: object;
  public type: string;
  public search: string;
  public apartments: any = new Object();
  public buildingDetails: IBudildingDetails = new BuildingDetails();
  public lat: number = 0;
  public lng: number = 0;
  public avgPriceSales: number;
  public avgPriceRentals: number;
  public totalActiveSales: any[] = [];
  public totalActiveRentals: any[] = [];
  public totalPastSales: any[] = [];
  public totalPastRentals: any[] = [];
  public avgFtSales: number;
  public avgFtRentals: number;
  public description = '';
  public showStreetView: boolean = true;
  public showImages: boolean = false;
  public breadcrumbs: IBreadcrumbs;
  public pointOfInterest: Object[];
  public subwayStations: IUIMapsPlace[] = [] as IUIMapsPlace[];
  public nearSchools: IUIMapsPlace[] = [] as IUIMapsPlace[];
  public cityBike: IUIMapsPlace[] = [] as IUIMapsPlace[];
  public query: IAutocomplete;
  public searchType: SearchType;
  public autosugestionString: string;
  public autosugestionModel: string;
  public markerIcon = {
    url: './assets/img/pointer.svg',
    scaledSize: {
      width: 20,
      height: 30,
    },
  };
  public onlyForLoggedUsers: boolean = false;
  public isAuthenticate: boolean = false;

  private serverUrl = environment.serverUrl;
  public amenitiesData: BuildingAmenities | any = new BuildingAmenities();
  public markerTypeEnum = MarkerType;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public util: UtilService,
    private readonly router: Router,
    private titleService: Title,
    private readonly store: Store<State>,
    private cdref: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.type = params.type;
      this.search = params.search;
      this.searchType = params.salesOrRental;
      if (!this.search) {
        this.router.navigate(['/home']);
      }
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getBuildingData();
    this.store.select(fromAuth.getLoggedIn).subscribe((isAuth: boolean) => {
      this.isAuthenticate = isAuth;
    });
  }

  ngAfterViewInit(): void {
    this.cdref.detectChanges();
    if (this.googleMap) {
      this.googleMap.mapInitialized.subscribe((map: any) => {
        // const bounds: LatLngBounds = new google.maps.LatLngBounds();
        // for (const mm of this.markers) {
        //   bounds.extend(new google.maps.LatLng(mm.lat, mm.lng));
        // }
        // map.fitBounds(bounds);
        map.setZoom(18);
      });
    }

    fromEvent(this.autosugestion.nativeElement, 'input')
      .pipe(map((event: Event) => (event.target as HTMLInputElement).value))
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe((data) => {
        this.autosugestionString = data;
      });
  }

  public navigateToBuilding(building: IUIBuildingCard): void {
    this.router.navigate(['/building'], {
      queryParams: {
        type: 'Address',
        search: building.address,
        address: building.address,
      },
    });
  }

  private getBuildingData() {
    this.amenities = [];
    this.apartments = [];
    this.http
      .get(`${this.serverUrl}/listings/building?type=${this.type}&search=${this.search.toLowerCase()}`)
      .subscribe((res: IBuildingData) => {
        this.buildingDetails = res.buildingDetails;
        this.autosugestionModel = res.buildingDetails.building_name
          ? res.buildingDetails.building_name
          : res.buildingDetails.address;
        this.titleService.setTitle(`${this.autosugestionModel} | Conquest`);
        this.apartments = res.apartments;
        this.amenitiesData = {};
        this.buildingDetails.building_elevator =
          res.buildingAmenities['Community Features']?.indexOf('Elevator') > -1 ||
          res.buildingAmenities['Security Features']?.indexOf('DoorMan') > -1;
        this.buildingDetails.building_pets =
          res.buildingAmenities['Pet Policy']?.indexOf('OK') > -1 ||
          res.buildingAmenities['Pet Policy']?.indexOf('Yes') > -1;
        this.newAmenities = res.buildingAmenities;
        this.lng = +this.buildingDetails.combined_longitude;
        this.lat = +this.buildingDetails.combined_latitude;
        this.breadcrumbs = res.breadcrumbs;
        this.subwayStations = res.subwayStations;
        this.pointOfInterest = res.pointOfInterest;
        this.cityBike = res.cityBike;
        this.similarBuildings = res.similarBuildings;
        // @ts-ignore
        let schools = this.pointOfInterest.filter((point) => point['facilitiesTypes'] === 'Education_Facility');
        if (schools.length > 0) {
          // @ts-ignore
          this.nearSchools = schools[0]['pointOfInterest'].slice(0, 20);
        } else {
          this.nearSchools = [];
        }
        this.description = ` ${
          !!this.buildingDetails.building_name ? this.buildingDetails.building_name : this.buildingDetails.address
        } is a ${this.buildingDetails.num_stories} story ${this.buildingDetails.property_type || ''} building in ${
          this.buildingDetails.place_name
        } . ${this.buildingDetails.year_built ? `It was built in ${this.buildingDetails.year_built}` : ``} ${
          this.buildingDetails.num_units ? `and has ${this.buildingDetails.num_units} units` : `.`
        }`;

        this.onlyForLoggedUsers = false;

        this.totalActiveSales = this.apartments.visibleActiveSalesApartments.filter((activeSales: any) => {
          if (activeSales.loginForMore) {
            this.onlyForLoggedUsers = true;
            return false;
          }
          return true;
        });
        this.totalActiveRentals = this.apartments.visibleActiveRentalsApartments.filter((activeRentals: any) => {
          if (activeRentals.loginForMore) {
            this.onlyForLoggedUsers = true;
            return false;
          }
          return true;
        });
        this.totalPastSales = this.apartments.visiblePastSalesApartments.filter((pastSales: any) => {
          if (pastSales.loginForMore) {
            this.onlyForLoggedUsers = true;
            return false;
          }
          return true;
        });
        this.totalPastRentals = this.apartments.visiblePastRentalsApartments.filter((pastRentals: any) => {
          if (pastRentals.loginForMore) {
            this.onlyForLoggedUsers = true;
            return false;
          }
          return true;
        });

        this.images = this.buildingDetails.image_list;
        if (this.images.length > 0) {
          this.showImages = true;
        } else {
          this.showImages = false;
        }
        this.addFacts();
        this.addAmenities();
        // this.showStreetView = true;
        // this.loadStreetView();
        // this.geocode(this.buildingData.address + ', New York, USA');
      });
  }

  public buildingPetsAllowed(pets: string) {
    return pets === 'OK' || pets === 'Yes' ? 'Allowed' : 'Not Allowed';
  }

  public streetView(view: string) {
    if (view == 'map') {
      this.showStreetView = false;
    } else {
      this.showStreetView = true;
    }
    this.showImages = false;
  }

  // private geocode(place: string) {
  //   return this.googleLoaded.subscribe((val) => {
  //     if (val) {
  //       // const streets = new google.maps.LatLng(
  //       //   this.buildingData.combined_latitude,
  //       //   this.buildingData.combined_longitude
  //       // );
  //       // const request = {
  //       //   location: streets,
  //       //   radius: '500',
  //       //   query: 'street',
  //       // };
  //       // const service = new google.maps.places.PlacesService();
  //       // service.textSearch(request, (results: any, status: any) => {
  //       //   if (status == google.maps.places.PlacesServiceStatus.O
  // ) {
  //       //   }
  //       // });
  //       // const geocoder = new google.maps.Geocoder();
  //       // return new Promise((resolve, reject) => {
  //       //   geocoder.geocode(
  //       //     {
  //       //       address: place,
  //       //     },
  //       //     (results: any, status: any) => {
  //       //       if (status === google.maps.GeocoderStatus.OK) {
  //       //         // resolve(results[0]);
  //       //       } else {
  //       //         reject(new Error(status));
  //       //       }
  //       //     }
  //       //   );
  //       // });
  //     }
  //   });
  // }

  // loadStreetView() {
  //   this.mapsAPILoader.load().then(() => {
  //     let center = { lat: this.lat, lng: this.lng };
  //     let map = new window['google'].maps.Map(this.streetviewMap.nativeElement, {
  //       center: center,
  //       zoom: 8,
  //       scrollwheel: false,
  //     });
  //     let panorama = new window['google'].maps.StreetViewPanorama(this.streetviewPano.nativeElement, {
  //       position: center,
  //       pov: { heading: 34, pitch: 10 },
  //       scrollwheel: false,
  //     });
  //     map.setStreetView(panorama);
  //   });
  // }

  public averagePrice(listing: any[], property: string) {
    let avg =
      listing.reduce((r: any, a: any) => {
        return r + a[property];
      }, 0) / listing.length;
    if (!avg) {
      return 0;
    }
    if (avg > 100000) {
      return this.util.convertToInternationalCurrencySystem(avg);
    }
    return avg.toLocaleString();
  }

  addFacts(): void {
    this.facts = [
      {
        value: this.buildingDetails.year_built,
        caption: 'built',
      },
      {
        value: this.buildingDetails.num_units,
        caption: 'units',
      },
      {
        value: this.buildingDetails.property_type,
        caption: 'Type',
      },
    ];

    if (this.buildingDetails.user_loged) {
      this.facts.push(
        {
          value: this.totalActiveSales.length,
          caption: `Active sales`,
        },
        {
          value: this.totalActiveRentals.length,
          caption: `Active rentals`,
        },
      );
    }
    this.facts = this.facts.filter((fact) => {
      if (typeof fact.value === 'number') {
        if (fact.value > 0) {
          return true;
        } else {
          return false;
        }
      }
      if (typeof fact.value === 'string') {
        if (fact.value.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    });
  }

  addAmenities(): void {
    let copyAmenities = { ...this.amenitiesData };
    // delete copyAmenities['building_id'];
    Object.keys(copyAmenities).forEach((key) => {
      // @ts-ignore
      if (!!copyAmenities[key] && !!Amenties[key]) {
        // @ts-ignore
        this.amenities.push(Amenties[key]);
      }
    });
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
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./'], {
        relativeTo: this.activatedRoute,
        queryParams: { type: this.query.type, search: search },
      });
    } else if (this.query.type === 'Address') {
      this.router.navigate(['/apartment'], { queryParams: { id: search, address: this.query.address } });
    } else {
      this.router.navigate(['/search'], {
        queryParams: { salesOrRental: this.query.sale_or_rental, type: this.query.type, search: search },
      });
    }
  }

  public clearQuery(): void {
    this.autosugestionModel = null;
  }

  public getNearestSchool() {
    if (!this.nearSchools) {
      return '';
    }
    if (this.nearSchools.length == 0) {
      return '';
    }
    return this.nearSchools[0].name?.toTitleCase(); //+ ' ' + (this.nearSchools[0].distance * 5280).toFixed(2) + ' Ft.';
  }

  imagesView() {
    this.showStreetView = true;
    this.showImages = true;
  }
}
