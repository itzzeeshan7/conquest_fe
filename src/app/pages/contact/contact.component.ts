import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { googleMapStyles } from '@app/constants/google-maps.constants';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: false,
})
export class ContactComponent implements OnInit {
  private serverUrl = environment.serverUrl;
  public readonly mapStyles = googleMapStyles;
  public lat = 40.71410695524748;
  public lng = -73.99671823104741;
  public markerIcon = {
    url: './assets/img/pointer.svg',
    scaledSize: {
      width: 20,
      height: 30,
    },
  };
  isLoading: boolean = false;
  contactForm: FormGroup;
  messageSend: boolean = false;
  showSend: boolean = false;

  private uuid: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }

  send(): void {
    const body = this.contactForm.getRawValue();
    body.code = this.uuid;
    this.http.post(`${this.serverUrl}/users/contact-us`, body).subscribe((res) => {
      this.createForm();
      this.showSend = false;
    });
  }

  notRobot() {
    this.http.get(`${this.serverUrl}/users/validate-contact-us`).subscribe((res: any) => {
      this.uuid = res.randUUid;
      this.showSend = true;
    });
  }
}
