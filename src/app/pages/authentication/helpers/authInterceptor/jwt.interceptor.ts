import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {AuthService} from '../../_service/auth.service';
import {TokenStorageService} from '../../_service/token-storage.service';
import {baseUrlApi} from "../../../../../api/entryPoint";


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private tokenService: TokenStorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authRequest = request;
    const token = this.tokenService.getToken();
    // add auth header with jwt if user is logged in and request is to the api url
    const user = this.authService.userValue;
    const isLoggedIn = user && token;
    const isApiUrl = request.url.startsWith(`${baseUrlApi}`);
    if (isLoggedIn && isApiUrl) {
      if (token != null) {
        authRequest = this.addTokenHeader(request, token);
      }
    }
    return next.handle(authRequest);
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
  }
}
