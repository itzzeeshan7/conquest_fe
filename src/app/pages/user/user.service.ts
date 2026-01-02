import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ChangePassword } from '../register/models/change-password.model';
import { User, UserRoles } from '../register/models/user.model';
import { OpenData } from './external-apis/external-apis.model';

@Injectable({
  providedIn: 'any',
})
export class UserService {
  private serverUrl = environment.serverUrl;

  constructor(private readonly http: HttpClient) {}

  updateUser(user: User) {
    return this.http.post(`${this.serverUrl}/users/update-info`, user).pipe(
      tap((user: User) => {
        return user;
      }),
    );
  }

  changePassword(changePassword: ChangePassword) {
    return this.http.post(`${this.serverUrl}/users/password`, changePassword).pipe(
      tap((user: User) => {
        return user;
      }),
      catchError(this.errorHandler),
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get(`${this.serverUrl}/users/get-all`).pipe(
      tap((users: User[]) => {
        return users;
      }),
    );
  }

  getRoles(): Observable<UserRoles[]> {
    return this.http.get(`${this.serverUrl}/users/get-all-roles`).pipe(
      tap((roles: UserRoles[]) => {
        return roles;
      }),
    );
  }

  getByEmail(user: User): Observable<User> {
    return this.http.get(`${this.serverUrl}/users/get-by-email`, { params: { email: user.email } }).pipe(
      tap((user: User) => {
        return user;
      }),
    );
  }

  updateUserByAdmin(user: User): Observable<User> {
    return this.http.patch(`${this.serverUrl}/users/update`, user).pipe(
      tap((user: User) => {
        return user;
      }),
      catchError(this.errorHandler),
    );
  }

  createUserByAdmin(user: User): Observable<User> {
    return this.http.post(`${this.serverUrl}/users/create`, user).pipe(
      tap((user: User) => {
        return user;
      }),
    );
  }

  deleteUserByAdmin(user: User): Observable<boolean> {
    return this.http.post(`${this.serverUrl}/users/delete`, user).pipe(
      tap((res: boolean) => {
        return res;
      }),
    );
  }

  getAllOpenDataApis(): Observable<OpenData[]> {
    return this.http.get(`${this.serverUrl}/other-apis/get-all`).pipe(
      tap((res: OpenData[]) => {
        return res;
      }),
    );
  }

  updateOpenDataQueryString(openData: OpenData): Observable<OpenData> {
    return this.http.post(`${this.serverUrl}/other-apis/update`, openData).pipe(
      tap((res: OpenData) => {
        return res;
      }),
    );
  }

  saveData(openData: OpenData): Observable<OpenData> {
    if (openData.id === 4 && openData.queryString === 'SaveData') {
      return this.http.get(`${this.serverUrl}/listings/fetchNewData`).pipe(
        tap((res: OpenData) => {
          return res;
        }),
      );
    }
  }

  getNews() {
    return this.http.get(`${this.serverUrl}/other-apis/news`).pipe(
      tap((res: any) => {
        return res;
      }),
    );
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error.');
  }
}
