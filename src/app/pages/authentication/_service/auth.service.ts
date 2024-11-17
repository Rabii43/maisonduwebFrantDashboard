import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

import {BehaviorSubject, Observable, throwError} from 'rxjs';

class Token {
  token: string;
  refresh_token: string;
  expiresIn: number;
}
import {EDIT_PASSWORD, LOGIN, TOKEN_REFRESH} from '../../../../api/entryPoint';
import {TokenStorageService} from './token-storage.service';
import {UserApiModel} from '../../_models/users';
import * as moment from 'moment';
import {jwtDecode} from "jwt-decode";

const httpOptions = {
  headers: new HttpHeaders()
};
httpOptions.headers.append('Access-Control-Allow-Origin', '*');
httpOptions.headers.append('Content-Type', 'application/json');
httpOptions.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<UserApiModel>;
  refreshUser = new UserApiModel();
  isLoggedIn = new BehaviorSubject(true);
  // helper methods
  refreshTokenTimeout: any;
  userSubject: BehaviorSubject<UserApiModel>;

  constructor(
    private http: HttpClient,
    public router: Router,
    private tokenStorage: TokenStorageService
  ) {
    this.userSubject = new BehaviorSubject<UserApiModel>(this.refreshUser);
    this.user = this.userSubject.asObservable();
    const token = localStorage.getItem('token');
    if (token) {
      this.getUserRoles();
    }
  }

  public get userValue(): UserApiModel {
    return this.userSubject.getValue();
  }

  setLoggedin(value: boolean): void {
    this.isLoggedIn.next(value);
  }

  // Sign-in
  login(email: string, password: string): Observable<any> {
    return this.http.post<object>(LOGIN, {email, password}, httpOptions);
  }

  // @ts-ignore
  refreshToken(): Observable<UserApiModel>{
    if (this.isLoggedIn.getValue()) {
      return this.http.post<any>(TOKEN_REFRESH, {
        refresh_token: this.tokenStorage.getRefreshToken()}, httpOptions).pipe(
        tap((user) => {
          this.setSession(user);
          this.userSubject.next(user);
          return user;
        })
      );
    }
  }

  editPassowrd(id: number, oldPpassword: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${EDIT_PASSWORD}`, {id: id, oldPpassword: oldPpassword, newPassword: newPassword});
  }

  decodeToken(): any {
    return jwtDecode(this.tokenStorage.getToken() || '');
  }

  getUserRoles(): String {
    if (this.tokenStorage.getToken() === '') {
      return '';
    }
    return this.decodeToken().roles;
  }

  getUserNav() {
    if (this.tokenStorage.getToken() === '') {
      return [];
    }
    return this.decodeToken();
  }

  signOut(): void {
    this.stopRefreshTokenTimer();
    this.userSubject.next(this.refreshUser);
    this.setLoggedin(false);
    window.localStorage.clear();
    this.router.navigate(['authentication/login']);
  }

  setSession(authResult: any): void {
    if (authResult !== null) {
      this.userSubject.next(authResult);
      this.setLoggedin(true);
      const expiresAt = moment().add(authResult.expiresIn, 'second');
      this.tokenStorage.saveToken(authResult.token);
      this.tokenStorage.saveRefreshToken(authResult.refresh_token);
      this.tokenStorage.saveUser(authResult);
      localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
      this.startRefreshTokenTimer();
    }
  }

  startRefreshTokenTimer(): void {
    // parse json object from base64 encoded jwt token
    if (this.userValue.token) {
      const jwtToken = JSON.parse(atob(this.userValue.token.split('.')[1]));
      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(jwtToken.exp * 1000);
      const timeoutToken = expires.getTime() - Date.now() - 60 * 1000;
      this.refreshTokenTimeout = setTimeout(
        () => {
          this.refreshToken().subscribe();
        }, timeoutToken);
    }
  }

  stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout);
  }

  forbidden() {
    this.router.navigate(['/error']);
  }
}
