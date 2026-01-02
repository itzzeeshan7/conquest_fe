import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ValidatePasswordConfirm } from '../../../@shared/validators/passwordConfirm.validator';
import { AuthenticationService } from '../../auth';
import { ChangePassword } from '../../register/models/change-password.model';
import { User } from '../../register/models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: false,
})
export class UserDetailsComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined | any;
  errorChangePassword: string | undefined | any;
  isLoading = false;
  registerForm: FormGroup;
  changePasswordForm: FormGroup;
  userInfo = true;
  passwordMessage = 'Password Required to save changes!';

  showUserInfoContainer = true;
  showSavedDataContainer = false;

  error$: Subscription;

  constructor(
    private readonly authService: AuthenticationService,
    private readonly userService: UserService,
  ) {}

  ngOnInit(): void {
    this.createForms();
    this.createChangePasswordForm();
    this.getUserInfo();
  }

  private getUserInfo() {
    this.authService.getUser().subscribe((user: User) => {
      this.registerForm.patchValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: '',
        receiveNotification: user.receiveNotification,
      });
    });
  }

  createForms(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.pattern('[- +()0-9]+')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      receiveNotification: new FormControl(''),
    });
  }

  createChangePasswordForm(): void {
    this.changePasswordForm = new FormGroup(
      {
        oldPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
      },
      ValidatePasswordConfirm,
    );
  }

  updateUserInfo() {
    this.userService.updateUser(this.registerForm.getRawValue()).subscribe((user: User) => {
      this.registerForm.patchValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: '',
        receiveNotification: user.receiveNotification,
      });
    });
  }

  changePassword() {
    let changePassword = new ChangePassword(
      this.changePasswordForm.get('oldPassword').value,
      this.changePasswordForm.get('password').value,
    );

    this.userService.changePassword(changePassword).subscribe(
      () => {
        this.errorChangePassword = false;
        this.createChangePasswordForm();
      },
      () => {
        this.errorChangePassword = true;
      },
    );
  }

  accessChangePassword() {
    this.userInfo = false;
  }

  accessUserInfo() {
    this.userInfo = true;
  }
}
