import { Component, Input, OnInit } from '@angular/core';

export interface IUIBuildingCard {
  building_id: string;
  img: string;
  building_name: string;
  address: string;
}

@Component({
  selector: 'app-building-card',
  templateUrl: './building-card.component.html',
  styleUrls: ['./building-card.component.scss'],
  standalone: false,
})
export class BuildingCardComponent implements OnInit {
  @Input()
  public building: IUIBuildingCard;

  constructor() {}

  ngOnInit(): void {}
}
