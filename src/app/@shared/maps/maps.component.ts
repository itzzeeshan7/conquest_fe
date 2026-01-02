import { Component, Input, OnInit } from '@angular/core';
import { googleMapStyles } from '@app/constants/google-maps.constants';
import { MarkerType } from './MarkerType.enum';

export interface IUIMapsPlace {
  name: string;
  address: string;
  lines: string;
  distance: number;
  info: string;
  notes: string;
  location: ILocation;
  type: string;
  markerType: string;
  coordinates: object[];
  randomColor: string;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

declare var google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  standalone: false,
})
export class MapsComponent implements OnInit {
  public _places: IUIMapsPlace[];
  public markers: object[] = [];
  public polylineMarkers: any[] = [];
  public type: MarkerType = MarkerType.marker;

  @Input() set places(value: IUIMapsPlace[]) {
    if (value) {
      if (value[0].markerType === 'polyline') {
        this.polylineMarkers = value.map((place) => {
          return {
            coordinates: place.coordinates,
            place: place,
            notes: place.notes,
            lat: place.location.latitude,
            lng: place.location.longitude,
            strokeColor: this.randomColor,
          };
        });
        this._places = value.map((place: IUIMapsPlace) => ({ ...place, strokeColor: this.randomColor }));
      } else {
        this.markers = value.map((place) => {
          return {
            place: place,
            lat: place.location.latitude,
            lng: place.location.longitude,
          };
        });
        this._places = value;
      }
    }
    // this.randomColors = this.markers.map((marker) => this.randomColor);
  }

  @Input() set markerType(value: MarkerType) {
    if (value) {
      this.type = value;
    }
  }

  @Input()
  public location: ILocation;

  MarkerTypeEnum = MarkerType;

  get places(): IUIMapsPlace[] {
    return this._places;
  }

  get markerType(): MarkerType {
    return this.type;
  }

  public readonly mapStyles = googleMapStyles;

  public markerIcon = {
    url: './assets/img/pointer.svg',
    scaledSize: {
      width: 20,
      height: 30,
    },
  };

  public mainMarkerIcon = {
    url: './assets/img/map-marker_2.svg',
    scaledSize: {
      width: 25,
      height: 35,
    },
  };

  constructor() {
    this.location = {
      latitude: 40.875134,
      longitude: -73.978277,
    };
  }

  ngOnInit(): void {}

  get randomColor() {
    return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
  }
}
