import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListingService } from '../../../@shared/services/listing.service';
import { ISearchData } from '../../search/ISearchData';

@Component({
  selector: 'app-saved-listing',
  templateUrl: './saved-listing.component.html',
  styleUrls: ['./saved-listing.component.scss'],
  standalone: false,
})
export class SavedListingComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly listingService: ListingService,
  ) {}

  items: ISearchData[] = [];
  building_place_names: Set<any>;
  apartment_place_names: Set<any>;
  apartment_groups: any[];
  building_groups: any[];
  sortBy: string = 'Time Added Last';
  apartments: boolean = false;
  buildings: boolean = false;

  ngOnInit(): void {
    this.apartments = false;
    this.buildings = false;
    this.getSavedData();
  }

  goToApartmentPage(apartament: ISearchData) {
    this.router.navigate(['/apartment'], {
      queryParams: {
        id: apartament.id,
        address: apartament.address_with_unit,
      },
    });
  }

  goToBuilding(building: ISearchData) {
    this.router.navigate(['/building'], {
      queryParams: {
        type: 'Address',
        search: building.address,
        address: building.address,
      },
    });
  }

  getSavedData() {
    this.listingService.getSavedListings().subscribe((data: ISearchData[]) => {
      this.apartment_groups = [];
      this.building_groups = [];
      this.items = data.filter((s) => !s.building);
      this.building_place_names = new Set(data.filter((item) => item.building).map((item) => item.place_name));
      this.building_place_names.forEach((p) => {
        this.building_groups.push({
          place_name: p,
          items: data.filter((i) => i.place_name == p && i.building),
        });
      });
      if (this.building_place_names.size > 0) this.buildings = true;

      this.apartment_place_names = new Set(data.filter((item) => item.apartment).map((item) => item.place_name));
      this.apartment_place_names.forEach((p) => {
        this.apartment_groups.push({
          place_name: p,
          items: data.filter((i) => i.place_name == p && i.apartment),
        });
      });
      if (this.apartment_place_names.size > 0) this.apartments = true;
    });
  }

  public sortListBy(value: string) {
    this.sortBy = value;
    switch (value) {
      case 'Time Added Last':
        this.items = this.items.sort((a, b) => {
          return new Date(a.date_created).getTime() - new Date(b.date_created).getTime();
        });
        break;
      case 'Time Added First':
        this.items = this.items.sort((a, b) => {
          return new Date(b.date_created).getTime() - new Date(a.date_created).getTime();
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
      case 'Price highest':
        this.items = this.items.sort((a, b) => {
          return b.listing_price - a.listing_price;
        });
        break;
    }
  }

  toggleApartments() {
    this.apartments = !this.apartments;
  }

  toggleBuildings() {
    this.buildings = !this.buildings;
  }
}
