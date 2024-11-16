import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import * as AuthActions from "../../../store/auth/auth.actions";
const TOKEN_KEY = 'access_token';  // auth-token
const REFRESHTOKEN_KEY = 'refresh_token'; //  'auth-refreshtoken';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
constructor(private store : Store) {
}
  // saveToken in localStorage
  saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
    const user = this.getUser();
    if (user && user.id) {
      this.saveUser({...user, accessToken: token});
    }
  }

  // get token from localStorage
  getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  // save refresh token in localStorage
  saveRefreshToken(token: string): void {
    window.localStorage.removeItem(REFRESHTOKEN_KEY);
    window.localStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  // get refresh token from localStorage
  getRefreshToken(): string | null {
    return window.localStorage.getItem(REFRESHTOKEN_KEY);
  }

  // save user in localStorage
  saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // get user from localStorage
  getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }
}
