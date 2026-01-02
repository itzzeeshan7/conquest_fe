import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IApartmentCard } from '@shared/apartament-card/apartament-card.component';
import { environment } from '../../../environments/environment';
import { UtilService } from '../../@shared/util/util.service';
import { Amenties } from '../building/Amenities.enum';
import { IApartmentDetails } from './IApartmentDetails';
import { googleMapStyles } from '@app/constants/google-maps.constants';
import { GoogleMap } from '@angular/google-maps';
import { IAutocomplete } from '../../@shared/autocomplete/IAutocomplete';
import { SearchType } from '../home/types/SearchType.enum';
import { IUIMapsPlace } from '../../@shared/maps/maps.component';
import { IBreadcrumbs } from '../../@shared/breadcrumbs/IBreadcrumbs';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import * as fromAuth from '@app/pages/auth/actions/reducer/index';
import { Store } from '@ngrx/store';
import { State } from '@app/pages/auth/actions/reducer/auth.reducers';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../auth/components/login/login.component';
import { Title } from '@angular/platform-browser';
import { MarkerType } from '../../@shared/maps/MarkerType.enum';
import { format, parse } from 'date-fns';
import { IUIFact } from '../../@shared/facts/facts.component';
import { tr } from 'date-fns/locale';

export interface IApartmentData {
  apartmentDetails: IApartmentDetails;
  apartmentAmenities: Object[];
  buildingAmenities: Object[];
  pointOfInterest: IUIMapsPlace[];
  subwayStations: IUIMapsPlace[];
  cityBike: IUIMapsPlace[];
  breadcrumbs: IBreadcrumbs;
  similarApartments: IApartmentCard[];
  buildingDetails: any;
}

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss'],
  standalone: false,
})
export class ApartmentComponent implements OnInit, AfterViewInit {
  @ViewChild('AgmMap') agmMap: GoogleMap;
  @ViewChild('autosugestion') autosugestion: ElementRef;
  @ViewChild('width')
  public width: ElementRef;

  public images: string[] = [];
  public floorImages: string[] = [];
  public imagesWithoutFloorPlan: string[] = [];
  public amenities: string[];
  public building: string[];
  public newApartmentAmenities: object;
  public newBuildingAmenities: object;
  public apartments: IApartmentCard[] = [];
  public apartmentData: IApartmentDetails = <IApartmentDetails>{};
  public buildingDetails: any;
  public pointOfInterest: Object[];
  public lat: number = 0;
  public lng: number = 0;
  public query: IAutocomplete;
  public searchType: SearchType;
  public searchQuery: string;
  public subwayStations: IUIMapsPlace[] = [] as IUIMapsPlace[];
  public nearSchools: IUIMapsPlace[] = [] as IUIMapsPlace[];
  public cityBike: IUIMapsPlace[] = [] as IUIMapsPlace[];
  public breadcrumbs: IBreadcrumbs;
  public totalImages: string[];
  public autosugestionString: string;
  public autosugestionModel: string;
  public facts: IUIFact[] = [];

  public similarApartments: IApartmentDetails[];

  public id: number;
  public florView: boolean = false;
  public showImages: boolean = true;
  public readonly mapStyles = googleMapStyles;
  public isAuthenticate: boolean = false;
  public showAllData: boolean = true;
  public mobileView: boolean = false;
  public markerTypeEnum = MarkerType;

  public showStreetView: boolean = false;
  public hasFloorPlan: boolean = false;
  public showImagesFloorPlan: boolean = false;
  public showMap: boolean = false;
  public showView: boolean = true;

  public markerIcon = {
    url: './assets/img/pointer.svg',
    scaledSize: {
      width: 20,
      height: 30,
    },
  };

  private serverUrl = environment.serverUrl;
  private modalOption: NgbModalOptions = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public util: UtilService,
    private readonly router: Router,
    private readonly store: Store<State>,
    private modalService: NgbModal,
    private titleService: Title,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.getById();
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnInit(): void {
    this.store.select(fromAuth.getLoggedIn).subscribe((isAuth: boolean) => {
      this.isAuthenticate = isAuth;
    });
  }

  ngAfterViewInit(): void {
    // Google Maps initialization - zoom and mapTypeId are set via template options
    // this.agmMap.googleMap is available if needed for advanced map manipulation

    fromEvent(this.autosugestion.nativeElement, 'input')
      .pipe(map((event: Event) => (event.target as HTMLInputElement).value))
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe((data) => {
        this.autosugestionString = data;
      });
    this.updateMobileView();
  }

  updateMobileView() {
    if (this.width.nativeElement.offsetWidth < 600) {
      this.mobileView = true;
    } else {
      this.mobileView = false;
    }
  }

  getById() {
    this.amenities = [];
    this.building = [];
    this.http.get(`${this.serverUrl}/listings/apartment?id=${this.id}`).subscribe((apartment: IApartmentData) => {
      if (apartment.apartmentDetails.notAllowed) {
        this.router.navigate(['/home']);
      }

      this.populateFacts(apartment.apartmentDetails);

      this.showAllData = apartment.apartmentDetails.idx;
      this.autosugestionModel = apartment.apartmentDetails.address_with_unit;
      this.titleService.setTitle(`${this.autosugestionModel} | Conquest`);
      this.addAmenities(apartment.apartmentAmenities, this.amenities);
      this.addAmenities(apartment.buildingAmenities, this.building);
      this.newApartmentAmenities = apartment.apartmentAmenities;
      this.newBuildingAmenities = apartment.buildingAmenities;
      this.apartmentData = apartment.apartmentDetails;
      this.buildingDetails = apartment.buildingDetails;
      // this.images = apartment.apartmentDetails.image_list_without_floorplans;
      this.floorImages = apartment.apartmentDetails.floor_plan_list;
      this.totalImages = apartment.apartmentDetails.image_list_original;
      if (this.floorImages?.length > 0) {
        this.florView = true;
        this.hasFloorPlan = true;
      }
      if (apartment.apartmentDetails.image_list_without_floorplans?.length > 0) {
        this.imagesWithoutFloorPlan = [...apartment.apartmentDetails.image_list_without_floorplans];
        this.images.push(...apartment.apartmentDetails.image_list_without_floorplans);
      }

      if (this.images?.length === 0) {
        this.showImages = false;
        this.florView = true;
        this.showMap = true;
        this.showView = false;
      }
      this.apartments = apartment.similarApartments;
      this.subwayStations = apartment.subwayStations;
      this.pointOfInterest = apartment.pointOfInterest;
      this.cityBike = apartment.cityBike;
      // @ts-ignore
      let schools = this.pointOfInterest.filter((point) => point['facilitiesTypes'] === 'Education_Facility');
      if (schools.length > 0) {
        // @ts-ignore
        this.nearSchools = schools[0]['pointOfInterest'].slice(0, 20);
      } else {
        this.nearSchools = [];
      }

      this.breadcrumbs = apartment.breadcrumbs;

      this.lat = +this.apartmentData.combined_latitude;
      this.lng = +this.apartmentData.combined_longitude;
    });
  }
  populateFacts(apartmentDetails: IApartmentDetails) {
    this.facts = [];
    if (apartmentDetails.listing_price) {
      this.facts.push({
        value: `$${this.util.convertToLocaleString(apartmentDetails.listing_price)}`,
        caption: 'Price',
      });
    }
    if (apartmentDetails.commission_amount) {
      this.facts.push({
        value: `${this.util.convertToLocaleString(apartmentDetails.commission_amount)}%`,
        caption: 'Commission',
      });
    }
    if (apartmentDetails.hoa_fee) {
      this.facts.push({
        value: `$${this.util.convertToLocaleString(apartmentDetails.hoa_fee)}`,
        caption: `${apartmentDetails.property_type == 'Condo' ? 'Common Charges' : 'Maintenance'}`,
      });
    }
  }

  addAmenities(listing: any, type: string[]): void {
    if (listing) {
      Object.keys(listing).forEach((key) => {
        // @ts-ignore
        if (!!listing[key] && !!Amenties[key]) {
          // @ts-ignore
          type.push(Amenties[key]);
        }
      });
    }
  }

  changeView(view: string) {
    if (this.apartmentData.image_list_without_floorplans?.length == 0) {
      return;
    }
    if (view !== 'map') {
      this.showImages = true;
      if (view === 'flor') {
        this.florView = false;
        this.images = this.apartmentData.floor_plan_list;
      } else {
        this.florView = true;
        this.images = this.apartmentData.image_list_without_floorplans;
      }
    } else {
      this.showImages = false;
      this.florView = false;
    }
  }

  showInitMap() {
    if (!this.images) {
      return false;
    } else {
      return this.showImages;
    }
  }

  public getExposure() {
    let exposure = [] as string[];
    if (this.apartmentData.east_exposure) {
      exposure.push('East');
    }
    if (this.apartmentData.north_exposure) {
      exposure.push('North');
    }
    if (this.apartmentData.south_exposure) {
      exposure.push('South');
    }
    if (this.apartmentData.west_exposure) {
      exposure.push('West');
    }
    return exposure;
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
    return this.nearSchools[0].name?.toTitleCase(); //+ (this.nearSchools[0].distance * 5280).toFixed(2) + 'Ft.';
  }

  login() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    return this.modalService.open(LoginComponent, this.modalOption);
  }

  parseDate(date: string | undefined) {
    if (!date) return;
    return format(new Date(date), 'yyyy-MM-dd');
  }

  imagesView(view?: string) {
    this.showStreetView = false;
    this.showImages = true;
    if (view == 'floorPlan') {
      this.showImagesFloorPlan = true;
      this.showView = false;
      this.images = this.floorImages;
    } else {
      this.showImagesFloorPlan = false;
      this.showView = true;
      this.images = this.imagesWithoutFloorPlan;
    }
  }

  public streetView(view: string) {
    if (view == 'map') {
      this.showStreetView = false;
    } else {
      this.showStreetView = true;
    }
    this.showImages = false;
    this.showView = false;
    this.showImagesFloorPlan = false;
  }
}
