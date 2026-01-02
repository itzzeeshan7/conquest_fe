import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../@shared/util/util.service';
import { LoginComponent } from '../../auth/components/login/login.component';

export interface IBuildingHistoryItem {
  image_list_original: string;
  address_with_unit: string;
  url?: string;
  status: string;
  listing_price: string;
  listing_price_per_sqft: string;
  num_bedrooms: number;
  num_baths: number;
  sqft: string;
}

@Component({
  selector: 'app-building-history',
  templateUrl: './building-history.component.html',
  styleUrls: ['./building-history.component.scss'],
  standalone: false,
})
export class BuildingHistoryComponent implements OnInit {
  @Input()
  public items: IBuildingHistoryItem[] = [];
  @Input()
  public avgPrice: number;
  @Input()
  public avgSqftPrice: number;
  @Input()
  public searchType: string;

  @Input()
  public onlyForLoggedUsers: boolean = false;

  @Input() listingType: string;

  private modalOption: NgbModalOptions = {};

  public defaultImg: string = './assets/img/not-available-img.png';

  constructor(
    private readonly router: Router,
    public util: UtilService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {}

  public goToApartment(item: Object) {
    this.router.navigate(['/apartment'], {
      // @ts-ignore
      queryParams: { id: item['id'], address: item['address_with_unit'] },
    });
  }

  login() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    return this.modalService.open(LoginComponent, this.modalOption);
  }
}
