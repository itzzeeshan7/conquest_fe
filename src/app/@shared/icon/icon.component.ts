import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  standalone: false,
})
export class IconComponent implements OnInit {
  @Input()
  public icon: string;
  @Input()
  public size: number;

  constructor() {}

  ngOnInit(): void {}
}
