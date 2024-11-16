import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../../_service/auth.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 403) {
        // redirect to the forbidden route
        this.authService.forbidden();
      }
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        // this.authService.signOut();
        // location.reload();
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
