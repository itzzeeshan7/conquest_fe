import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class LandingPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
