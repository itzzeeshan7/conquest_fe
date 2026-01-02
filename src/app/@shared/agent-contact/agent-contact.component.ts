import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '@app/pages/auth/actions/reducer/auth.reducers';
import * as fromAuth from '@app/pages/auth/actions/reducer/index';
import { User } from '../../pages/register/models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IApartmentDetails } from '../../pages/apartment/IApartmentDetails';

import { ListingService } from '../services/listing.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../pages/auth/components/login/login.component';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { IBudildingDetails } from '../../pages/building/buildingDetails';

@Component({
  selector: 'app-agent-contact',
  templateUrl: './agent-contact.component.html',
  styleUrls: ['./agent-contact.component.scss'],
  standalone: false,
})
export class AgentContactComponent implements OnInit, OnChanges {
  isAuthenticate: boolean;
  user: User;
  contactAgentForm: FormGroup;
  showSendButton: boolean;
  modalOption: NgbModalOptions = {};
  saved_data: boolean;
  showImages: string[];

  @Input() images: string[];
  @Input() apartamentData: IApartmentDetails;
  @Input() buildingData: IBudildingDetails;
  url: string;
  showSend: boolean = false;
  showSharedButtons: boolean = false;
  messageSent: boolean = false;

  private uuid: string;
  private serverUrl = environment.serverUrl;

  constructor(
    private readonly store: Store<State>,
    private readonly http: HttpClient,
    private readonly listingService: ListingService,
    private modalService: NgbModal,
  ) {
    this.url = window.location.href;
  }

  ngOnInit(): void {
    this.createForm();
    this.store.select(fromAuth.getLoggedIn).subscribe((isAuth: boolean) => {
      this.isAuthenticate = isAuth;
      if (isAuth) {
        this.user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
        if (this.user) {
          this.contactAgentForm.patchValue({
            name: this.user.name,
            email: this.user.email,
            phone: this.user.phone ? this.user.phone : '',
          });
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const { apartamentData = null } = changes;
    const { buildingData = null } = changes;
    const { images = null } = changes;
    if (images) {
      this.showImages = images.currentValue;
    }
    this.showSendButton = true;
    let interestIn = apartamentData
      ? apartamentData.currentValue.address_with_unit + ', ' + apartamentData.currentValue.city
      : buildingData.currentValue.building_name
        ? buildingData.currentValue.building_name + ', ' + buildingData.currentValue.city
        : buildingData.currentValue.address + ', ' + buildingData.currentValue.city;
    this.saved_data = apartamentData ? apartamentData.currentValue.saved_data : buildingData.currentValue.saved_data;
    if (this.contactAgentForm) {
      this.contactAgentForm.patchValue({
        message: `I am interested in ${interestIn}`,
      });
    }
  }

  createForm() {
    this.contactAgentForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.pattern('[- +()0-9]+')]),
      message: new FormControl('', [Validators.required]),
    });
  }

  sendMessage() {
    const body = this.contactAgentForm.getRawValue();
    body.code = this.uuid;
    body.extraInfo = this.apartamentData ? this.apartamentData : this.buildingData;
    body.subject = `Contact agent`;
    body.phone = body.phone || null;
    this.http.post(`${this.serverUrl}/users/contact-us`, body).subscribe((res) => {
      this.showSendButton = false;
      this.messageSent = true;
      this.contactAgentForm.disable();
    });
  }

  save(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    const page = this.apartamentData ? 'apartment' : 'building';
    if (this.isAuthenticate) {
      if (page === 'apartment') {
        this.listingService.saveDeleteApartment(this.apartamentData.id).subscribe((response) => {
          // @ts-ignore
          if (!!response['data'].added) {
            this.saved_data = true;
          } else {
            this.saved_data = false;
          }
        });
      } else {
        this.listingService.saveDeleteBuilding(this.buildingData.building_key).subscribe((response) => {
          // @ts-ignore
          if (!!response['data'].added) {
            this.saved_data = true;
          } else {
            this.saved_data = false;
          }
        });
      }
    } else {
      this.prepareDialog(LoginComponent);
    }
  }

  private prepareDialog(component: any) {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    return this.modalService.open(component, this.modalOption);
  }

  notRobot() {
    this.http.get(`${this.serverUrl}/users/validate-contact-us`).subscribe((res: any) => {
      this.uuid = res.randUUid;
      this.showSend = true;
    });
  }

  openShareButtons() {
    this.showSharedButtons = !this.showSharedButtons;
  }

  openAllPhotos() {
    let modalOptions: NgbModalOptions = {
      size: 'xl',
    };
    const modalRef = this.modalService.open(ImagePreviewComponent, modalOptions);
    modalRef.componentInstance.images = this.showImages;
  }
}
