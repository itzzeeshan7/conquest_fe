import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { Logger } from '@core';
import { JwtHelperService } from '@auth0/angular-jwt';

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private jwtService: JwtHelperService,
  ) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token && !this.jwtService.isTokenExpired(token)) {
      return true;
    }

    log.debug('Not authenticated, redirecting and adding redirect url...');
    this.router.navigate(['/home']);
    return false;
  }

  canActivateChild(): boolean {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token && !this.jwtService.isTokenExpired(token)) {
      return true;
    }

    log.debug('Not authenticated, redirecting and adding redirect url...');
    this.router.navigate(['/home']);
    return false;
  }
}
