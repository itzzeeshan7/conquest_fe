import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Auth } from '@app/pages/auth/models/auth.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { AuthToken } from '@app/pages/auth/models/auth-token.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../register/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private serverUrl = environment.serverUrl;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(user: Auth): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.serverUrl}/auth`, { email: user.email, password: user.password }).pipe(
      tap((authToken: AuthToken) => {
        const storage = user.remember ? localStorage : sessionStorage;
        storage.setItem('token', authToken.token);
        this.getUser(user).subscribe((res) => {
          this.reloadComponent();
        });
      }),
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.reloadComponent();
    return of(true);
  }

  loadToken(): Observable<AuthToken> {
    const token = new AuthToken(localStorage.getItem('token'));
    return of(token);
  }

  getUser(userAuth?: Auth): Observable<User> {
    return this.http.get<User>(`${this.serverUrl}/users/me`).pipe(
      tap((user: User) => {
        if (userAuth) {
          const storage = userAuth.remember ? localStorage : sessionStorage;
          storage.setItem('user', JSON.stringify(user));
        } else {
          return user;
        }
      }),
    );
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    if (currentUrl.indexOf('user') > 0) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl(currentUrl);
    }
  }
}
