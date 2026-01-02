import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ValidatePasswordConfirm } from '../../@shared/validators/passwordConfirm.validator';
import { AuthenticationService } from '../auth';
import { User } from '../register/models/user.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: false,
})
export class UserComponent implements OnInit {
  isAdmin: boolean;

  constructor() {}

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.isAdmin = user.roles.filter((role) => role.name === 'ADMIN').length > 0;
  }
}
