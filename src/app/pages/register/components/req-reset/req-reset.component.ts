import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '@app/pages/register/actions/reducer/register.reducers';
import { RequestResetPasswordAction, ResetStateAction } from '@app/pages/register/actions/register.action';
import * as fromRegister from '@app/pages/register/actions/reducer/index';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-req-reset',
  templateUrl: './req-reset.component.html',
  styleUrls: ['./req-reset.component.scss'],
  standalone: false,
})
export class ReqResetComponent implements OnInit {
  version: string | null = environment.version;
  error: string | any | undefined;
  isLoading = false;
  isSuccess: boolean;
  time: number;
  resetForm: FormGroup;

  isLoading$: Subscription;
  isSuccess$: Subscription;
  error$: Subscription;

  constructor(
    private store: Store<State>,
    private router: Router,
  ) {
    this.time = 5;
  }

  ngOnInit(): void {
    this.createForm();
    this.getInfo();
  }

  getInfo() {
    this.isLoading$ = this.store.select(fromRegister.getLoading).subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.error$ = this.store.select(fromRegister.getError).subscribe((error: any) => (this.error = error));
    this.isSuccess$ = this.store.select(fromRegister.getIsSuccess).subscribe((isSuccess: boolean) => {
      this.isSuccess = isSuccess;
      if (isSuccess) this.redirectTo('/login');
    });
  }

  createForm(): void {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  reset() {
    this.isLoading = true;
    this.store.dispatch(new RequestResetPasswordAction(this.resetForm.value));
  }

  redirectTo(path: string) {
    const interval = setInterval(() => this.time--, 1000);
    setTimeout(() => {
      this.router.navigate([path]);
      this.store.dispatch(new ResetStateAction());
      clearInterval(interval);
    }, this.time * 1000);
  }
}
