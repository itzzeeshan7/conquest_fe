import { Component, Input, OnInit } from '@angular/core';
import { isSameDay, endOfMonth, eachDayOfInterval, addDays, format } from 'date-fns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../pages/register/models/user.model';
import { IApartmentDetails } from '../../pages/apartment/IApartmentDetails';
import { IBudildingDetails } from '../../pages/building/buildingDetails';
import { Store } from '@ngrx/store';
import { State } from '@app/pages/auth/actions/reducer/auth.reducers';
import * as fromAuth from '@app/pages/auth/actions/reducer/index';

@Component({
  selector: 'app-schedule-viewing',
  templateUrl: './schedule-viewing.component.html',
  styleUrls: ['./schedule-viewing.component.scss'],
  standalone: false,
})
export class ScheduleViewingComponent implements OnInit {
  @Input()
  public img: string;

  @Input()
  public info: string;

  @Input()
  public data: IBudildingDetails | IApartmentDetails | any;

  public form: FormGroup;
  public config: any;
  public defaultImg: string = './assets/img/not-available-img.png';
  public showSend: boolean = false;
  public showCancel: boolean = false;
  public showRobot: boolean = true;
  private uuid: string;
  private serverUrl = environment.serverUrl;
  private user: User;
  private isAuthenticate: boolean;

  constructor(
    private readonly store: Store<State>,
    private readonly formBuilder: FormBuilder,
    private readonly http: HttpClient,
  ) {
    this.form = this.buildForm();
    this.config = {
      navigation: {
        prevEl: '.arrow-lft',
        nextEl: '.arrow-right',
      },
      slidesPerView: 'auto',
      loop: false,
      simulateTouch: false,
    };
  }

  ngOnInit(): void {
    this.store.select(fromAuth.getLoggedIn).subscribe((isAuth: boolean) => {
      this.isAuthenticate = isAuth;
      if (isAuth) {
        this.user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
      }
    });
  }

  public get dates(): Date[] {
    const today = new Date();
    let nextMonth = new Date();
    if (nextMonth.getMonth() == 11) {
      nextMonth = new Date(today.getFullYear() + 1, 0, 1);
    } else {
      nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    }
    return eachDayOfInterval({
      start: addDays(today, 1),
      end: endOfMonth(nextMonth),
    });
  }

  public buildForm(): FormGroup {
    return this.formBuilder.group({
      type: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
  }

  public changeViewingType(type: string): void {
    this.form.controls.type.setValue(type);
  }

  public changeViewingDate(date: Date): void {
    this.form.controls.date.setValue(date.toISOString());
  }

  public isActiveDate(date: Date): boolean {
    return this.form.controls.date.value ? isSameDay(date, new Date(this.form.controls.date.value)) : false;
  }

  notRobot() {
    this.http.get(`${this.serverUrl}/users/validate-contact-us`).subscribe((res: any) => {
      this.showRobot = false;
      this.uuid = res.randUUid;
      if (this.data.scheduled_view) {
        this.showCancel = true;
      } else {
        this.showSend = true;
      }
    });
  }

  formatDate(date: Date) {
    return format(new Date(date), 'MM/dd/yyyy');
  }

  schedule() {
    const listingType = this.data.address_with_unit ? 'apartment' : 'building';
    const body = {
      message: ` Schedule Viewing:
      User Info:
      Name: ${this.user.name},
      Email: ${this.user.email},
      Scheduled ${this.form.get('type').value} viewing of ${this.info} ${listingType} on ${this.formatDate(
        this.form.get('date').value,
      )}!`,
      code: this.uuid,
      scheduledDate: this.form.get('date').value,
      listing_key: listingType === 'apartment' ? this.data.id : undefined,
      building_key: listingType === 'building' ? this.data.building_id : undefined,
    };
    this.http.post(`${this.serverUrl}/users/schedule-view`, body).subscribe((res) => {
      this.data.scheduled_date = this.form.get('date').value;
      this.data.scheduled_view = true;
      this.showSend = false;
      this.showRobot = true;
    });
  }

  cancelScheduled() {
    const listingType = this.data.address_with_unit ? 'apartment' : 'building';
    const body = {
      apartmentId: listingType === 'apartment' ? this.data.id : undefined,
      buildingId: listingType === 'building' ? this.data.building_id : undefined,
      code: this.uuid,
    };
    this.http.post(`${this.serverUrl}/users/cancel-schedule-view`, body).subscribe((res) => {
      this.data.scheduled_view = false;
      this.showCancel = false;
      this.showRobot = true;
    });
  }
}
