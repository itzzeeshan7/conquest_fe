import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatePasswordConfirm } from '@shared/validators/passwordConfirm.validator';
import { Store } from '@ngrx/store';
import { State } from '@app/pages/register/actions/reducer/register.reducers';
import { RegisterAction } from '@app/pages/register/actions/register.action';
import { RegisterUser } from '@app/pages/register/models/register-user.model';
import { Subscription } from 'rxjs';
import * as fromRegister from '@app/pages/register/actions/reducer/index';
import { MyModalService } from '../../../../@shared/services/modal.service';
import { LinkEnum } from '../../../../@shared/header-nav/enums/link.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false,
})
export class RegisterComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined | any;
  isLoading = false;
  registerForm: FormGroup;

  error$: Subscription;
  successful$: Subscription;

  constructor(
    private store: Store<State>,
    private modalService: MyModalService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.error$ = this.store.select(fromRegister.getError).subscribe((error: any) => {
      this.error = error;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.error$.unsubscribe();
  }

  createForm(): void {
    this.registerForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.pattern('[- +()0-9]+')]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)]),
        // rodo: new FormControl(false, [Validators.requiredTrue]),
      },
      ValidatePasswordConfirm,
    );
  }

  register(): void {
    this.isLoading = true;
    this.error = null;
    const user = new RegisterUser(this.registerForm.value);
    this.store.dispatch(new RegisterAction(user));
    this.successful$ = this.store.select(fromRegister.getRegisterState).subscribe((success: any) => {
      if (success.registerList.isSuccess) {
        this.modalService.dismissAll();
      }
    });
  }

  cancel() {
    this.modalService.dismissAll();
  }

  openDialog() {
    this.modalService.dismissAll();
    this.modalService.openModalFunction(LinkEnum.Login);
  }
}
