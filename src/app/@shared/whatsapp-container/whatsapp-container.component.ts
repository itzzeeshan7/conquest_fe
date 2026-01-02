import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp-container.component.html',
  styleUrls: ['./whatsapp-container.component.scss'],
  standalone: false,
})
export class WhatsAppContainerComponent {
  address: string;
  href: string = ``;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.address = params['address'] || undefined;
      this.href = `https://wa.me/19176649333?text=${encodeURIComponent(
        `I am interested in ${this.address ? this.address : 'apartment'}`,
      )}`;
    });
  }
}
