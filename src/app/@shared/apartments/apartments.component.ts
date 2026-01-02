import { Component, Input, OnInit } from '@angular/core';
import { IApartmentCard } from '@shared/apartament-card/apartament-card.component';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss'],
  standalone: false,
})
export class ApartmentsComponent implements OnInit {
  @Input() apartments: IApartmentCard[];

  constructor() {}

  ngOnInit(): void {}

  public removeAppartmentFromList(apartment: IApartmentCard) {
    let index = this.apartments.indexOf(apartment);
    this.apartments.splice(index, 1);
  }
}
