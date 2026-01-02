import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Logger } from '../../../@core';
import { User } from '../../register/models/user.model';

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtService: JwtHelperService,
  ) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token && !this.jwtService.isTokenExpired(token)) {
      const user: User = JSON.parse(localStorage.getItem('user'));
      if (user.roles.filter((role) => role.name === 'ADMIN').length > 0) {
        return true;
      } else {
        log.debug('Not authenticated, redirecting and adding redirect url...');
        this.router.navigate(['/home']);
        return false;
      }
    }

    log.debug('Not authenticated, redirecting and adding redirect url...');
    this.router.navigate(['/home']);
    return false;
  }
}
