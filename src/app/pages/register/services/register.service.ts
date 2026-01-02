import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { RegisterUser } from '@app/pages/register/models/register-user.model';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Params, Router } from '@angular/router';
import { ResetPassword } from '@app/pages/register/models/reset-password.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private serverUrl = environment.serverUrl;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  register(user: RegisterUser): Observable<RegisterUser> {
    return this.http.post<RegisterUser>(`${this.serverUrl}/users/register`, user);
  }

  activatedEmail(code: Params) {
    return this.http.post(`${this.serverUrl}/users/activate/email`, code).pipe(tap((data) => data));
  }

  requestResetPassword(email: string) {
    return this.http.post(`${this.serverUrl}/users/request-reset-password`, email).pipe(tap((data) => data));
  }

  resetPassword(reset: ResetPassword) {
    return this.http.post(`${this.serverUrl}/users/reset-password`, reset);
  }
}
