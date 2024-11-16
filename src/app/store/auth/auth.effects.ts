import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as AuthActions from './auth.actions';
import {AuthService} from "../../pages/authentication/_service/auth.service";
import {UserApiModel} from "../../pages/_models/users";
import {jwtDecode} from "jwt-decode";

@Injectable()
export class AuthEffects {
  // Effect to handle the login action
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login), // Listen for the login action
      switchMap(({email, password}) =>
        this.authService.login(email, password).pipe(
          map((response: { user: UserApiModel; token: string; refresh_token: string }) =>
            AuthActions.loginSuccess({
              user: jwtDecode(response.token),
              token: response.token,
              refresh_token: response.refresh_token
            }),
          ),
          catchError((error: string) =>
            of(AuthActions.loginFailure({error}))
          )
        )
      )
    )
  );
  // Effect to handle actions after a successful login
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess), // Listen for loginSuccess action
        tap(({user, token, refresh_token}) => {
          // Set session data in local storage
          this.authService.setSession({user, token, refresh_token});
          // Redirect to the dashboard after successful login
          this.router.navigate(['/dashboards']);
        })
      ),
    {dispatch: false} // This effect does not need to dispatch a new action
  );
  // Effect to handle login failure actions (e.g., logging errors)
  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure), // Listen for loginFailure action
        tap(({error}) => {
          // Log the error or handle it as necessary
          console.error('Login failed:', error);
        })
      ),
    {dispatch: false} // No action to dispatch on failure
  );

  // Effect to handle logout failure actions (e.g., logging errors)
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          // Clear local storage
          localStorage.clear();
          // Redirect to login page
          this.router.navigate(['/authentication/login']);
        })
      ),
    {dispatch: false} // No new action is dispatched
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {
  }
}
