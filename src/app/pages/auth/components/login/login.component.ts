import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Logger } from '@core';
import { Store } from '@ngrx/store';
import { State } from '@app/pages/auth/actions/reducer/auth.reducers';
import { ClearLoginErrorMessage, LogInAction } from '@app/pages/auth/actions/auth.action';
import * as fromAuth from '@app/pages/auth/actions/reducer/index';
import { Observable, of, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReqResetComponent } from '@app/pages/register/components/req-reset/req-reset.component';
import { RegisterComponent } from '../../../register/components/register/register.component';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined | any;
  loginForm!: FormGroup;
  isLoading = false;

  // isLoading$: Subscription;
  error$: Subscription;

  isLoggedIn$: Observable<boolean>;

  constructor(
    private store: Store<State>,
    private modalService: NgbModal,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(fromAuth.getLoggedIn).pipe(
      switchMap((isAuth) => {
        this.isLoading = isAuth;
        if (isAuth) {
          this.modalService.dismissAll();
        }
        return of(isAuth);
      }),
    );
    this.error$ = this.store.select(fromAuth.getError).subscribe((error: any) => {
      this.error = error;
    });
  }

  ngOnDestroy() {
    this.error$.unsubscribe();
  }

  openDialog(type: string) {
    if (type === 'reset') {
      this.modalService.dismissAll();
      this.modalService.open(ReqResetComponent);
    } else {
      this.modalService.dismissAll();
      this.modalService.open(RegisterComponent);
    }
  }

  login() {
    this.isLoading = true;
    this.store.dispatch(new LogInAction(this.loginForm.value));
    this.isLoggedIn$ = this.store.select(fromAuth.getLoggedIn).pipe(
      switchMap((isAuth) => {
        this.isLoading = isAuth;
        if (isAuth) {
          this.modalService.dismissAll();
        }
        return of(isAuth);
      }),
    );
  }

  private createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      remember: new FormControl(true, []),
    });
  }

  cancel() {
    this.modalService.dismissAll();
    this.store.dispatch(new ClearLoginErrorMessage());
  }
}
