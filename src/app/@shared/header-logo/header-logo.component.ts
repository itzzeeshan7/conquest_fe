import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-logo',
  templateUrl: './header-logo.component.html',
  styleUrls: ['./header-logo.component.scss'],
  standalone: false,
})
export class HeaderLogoComponent implements OnInit {
  @Input()
  public isDarkMode: boolean;

  constructor() {
    this.isDarkMode = false;
  }

  ngOnInit(): void {}
}
