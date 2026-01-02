import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISearchData } from '../../pages/search/ISearchData';
import { ListingService } from '../services/listing.service';
import { Store } from '@ngrx/store';
import { State } from '@app/pages/auth/actions/reducer/auth.reducers';
import * as fromAuth from '@app/pages/auth/actions/reducer/index';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../pages/auth/components/login/login.component';
import { UtilService } from '../util/util.service';

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.scss'],
  standalone: false,
})
export class PropertyItemComponent implements OnInit {
  public config: any;

  @Input()
  public item: ISearchData;

  isAuthenticate$: Subscription;
  isAuthenticate: boolean;
  modalOption: NgbModalOptions = {};
  defaultImg: string = './assets/img/not-available-img.png';

  constructor(
    private readonly listingService: ListingService,
    private store: Store<State>,
    private modalService: NgbModal,
    public util: UtilService,
  ) {}

  ngOnInit(): void {
    this.config = {
      centeredSlides: true,
      speed: 2000,
      initialSlide: 1,
      effect: 'slide',
      allowTouchMove: true,
      shortSwipes: true,
      followFinger: true,
      loop: true,
      autoplay: true,
    };

    this.isAuthenticate$ = this.store.select(fromAuth.getLoggedIn).subscribe((isAuth: boolean) => {
      this.isAuthenticate = isAuth;
    });
  }

  getImage(i: number) {
    if (this.item.image_list) {
      if (!this.item.image_list.length) {
        this.item.image_list.push('./assets/img/property-img.jpg');
        this.item.image_list.push('./assets/img/property-img.jpg');
      }
    } else {
      this.item.image_list = [];
      this.item.image_list.push('./assets/img/property-img.jpg');
      this.item.image_list.push('./assets/img/property-img.jpg');
    }
    return this.item.image_list[i];
  }

  public saveApartment(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    if (this.isAuthenticate) {
      this.listingService.saveDeleteApartment(this.item.id).subscribe((response) => {
        // @ts-ignore
        if (!!response['data'].added) {
          this.item.saved_data = true;
        } else {
          this.item.saved_data = false;
        }
      });
    } else {
      this.prepareDialog(LoginComponent);
    }
  }

  private prepareDialog(component: any) {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    return this.modalService.open(component, this.modalOption);
  }
}
