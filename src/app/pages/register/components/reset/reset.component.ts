import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '@env/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '@app/pages/register/actions/reducer/register.reducers';
import { ResetPasswordAction, ResetStateAction } from '@app/pages/register/actions/register.action';
import { ValidatePasswordConfirm } from '@shared/validators/passwordConfirm.validator';
import { ResetPassword } from '@app/pages/register/models/reset-password.model';
import * as fromRegister from '@app/pages/register/actions/reducer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  standalone: false,
})
export class ResetComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  params: Params;
  error: string | any | undefined;
  isSuccess: boolean;
  isLoading = false;
  time: number;
  resetForm: FormGroup;

  public isLoading$: Subscription;
  public isSuccess$: Subscription;
  public error$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private router: Router,
    private myModalService: NgbModal,
  ) {
    this.time = 5;
  }

  ngOnInit(): void {
    this.createForm();
    this.getInfo();
    this.route.queryParams.subscribe((params) => {
      this.params = params;
    });
  }

  ngOnDestroy() {
    this.error$.unsubscribe();
    this.isSuccess$.unsubscribe();
    this.isLoading$.unsubscribe();
  }

  createForm() {
    this.resetForm = new FormGroup(
      {
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        passwordConfirm: new FormControl('', [Validators.required]),
      },
      ValidatePasswordConfirm,
    );
  }

  getInfo(): void {
    this.isLoading$ = this.store.select(fromRegister.getLoading).subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.error$ = this.store.select(fromRegister.getError).subscribe((error: any) => (this.error = error));
    this.isSuccess$ = this.store.select(fromRegister.getIsSuccess).subscribe((isSuccess: boolean) => {
      this.isSuccess = isSuccess;
      if (isSuccess) this.redirectTo('/home');
    });
  }

  reset(): void {
    this.isLoading = true;
    const reset = new ResetPassword({ ...this.resetForm.value, code: this.params.code });
    this.store.dispatch(new ResetPasswordAction(reset));
  }

  redirectTo(path: string) {
    const interval = setInterval(() => this.time--, 1000);
    setTimeout(() => {
      this.router.navigate([path]);
      this.store.dispatch(new ResetStateAction());
      this.myModalService.dismissAll();
      clearInterval(interval);
    }, this.time * 1000);
  }
}
