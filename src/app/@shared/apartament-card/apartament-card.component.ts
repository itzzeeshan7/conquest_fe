import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../util/util.service';

export interface IApartmentCard {
  id: number;
  listing_price: number;
  address_with_unit: string;
  image: string;
  place_name: string;
  region: string;
  address: string;
  beds: number;
  num_baths: number;
  sqft: number;
}

@Component({
  selector: 'app-apartament-card',
  templateUrl: './apartament-card.component.html',
  styleUrls: ['./apartament-card.component.scss'],
  standalone: false,
})
export class ApartmentCardComponent implements OnInit {
  @Input() apartament: IApartmentCard;
  @Input() image: string;

  @Output()
  public removeApartment = new EventEmitter<IApartmentCard>();

  public type: string;
  public search: string;
  public defaultImg: string = './assets/img/not-available-img.png';

  constructor(
    public util: UtilService,
    private readonly router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.type = params.type;
      this.search = params.search;
    });
  }

  ngOnInit(): void {}

  public goToApartment(apartment: any) {
    this.router.navigate(['/apartment'], {
      queryParams: { id: apartment.id, address: apartment.address_with_unit },
    });
  }

  public removeApartmentFromList(apartament: IApartmentCard) {
    this.removeApartment.emit(apartament);
  }
}
