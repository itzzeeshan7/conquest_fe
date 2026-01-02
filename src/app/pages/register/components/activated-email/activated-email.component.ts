import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { State } from '@app/pages/register/actions/reducer/register.reducers';
import { ActivationEmailAction, ResetStateAction } from '@app/pages/register/actions/register.action';
import { Subscription } from 'rxjs';
import * as fromRegister from '@app/pages/register/actions/reducer/index';

@Component({
  selector: 'app-activated-email',
  templateUrl: './activated-email.component.html',
  styleUrls: ['./activated-email.component.scss'],
  standalone: false,
})
export class ActivatedEmailComponent implements OnInit, OnDestroy {
  public params: Params;
  public isAuth: boolean;
  public error: string | undefined;
  public isSuccess: boolean;
  public time: number;

  public isSuccess$: Subscription;
  public error$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private jwtHelperService: JwtHelperService,
    private store: Store<State>,
    private router: Router,
  ) {
    this.isAuth = false;
    this.isSuccess = false;
    this.time = 5;
  }

  ngOnInit(): void {
    this.isSuccess$ = this.store.select(fromRegister.getIsSuccess).subscribe((success: boolean) => {
      this.isSuccess = success;
      if (this.isSuccess === true) this.redirectTo('/home');
    });
    this.error$ = this.store.select(fromRegister.getError).subscribe((error: any) => {
      this.error = error;
    });
    this.isAuth = this.checkAuth();

    this.route.queryParams.subscribe((params) => {
      this.params = params;
    });

    this.store.dispatch(new ActivationEmailAction(this.params));
  }

  ngOnDestroy() {
    this.isSuccess$.unsubscribe();
  }

  checkAuth(): boolean {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token && !this.jwtHelperService.isTokenExpired(token)) {
      return true;
    }
    return false;
  }

  getCode(): Params {
    return this.route.snapshot.params;
  }

  redirectTo(path: string) {
    const interval = setInterval(() => this.time--, 1000);
    setTimeout(() => {
      this.router.navigate([path]);
      this.store.dispatch(new ResetStateAction());
      clearInterval(interval);
    }, 5000);
  }
}
