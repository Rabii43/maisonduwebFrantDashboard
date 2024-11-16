import { createAction, props } from '@ngrx/store';
import { UserApiModel } from '../../pages/_models/users';

// Login Actions
export const login = createAction(
  '[Login]',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[LoginSuccess]',
  props<{ user: UserApiModel; token: string; refresh_token: string }>()
);

export const loginFailure = createAction(
  '[LoginFailure]',
  props<{ error: string }>()
);

// Logout Action
export const logout = createAction('[Logout]');

// Token Refresh Actions
export const refreshToken = createAction('[Refresh Token]');

export const refreshTokenSuccess = createAction(
  '[Refresh Token Success]',
  props<{ token: string | undefined }>()
);

// Set User Action
export const setUser = createAction(
  '[Auth] Set User',
  props<{ user: UserApiModel }>()
);

// Set Token Action
export const setToken = createAction(
  '[Auth] Set Token',
  props<{ token: string; refresh_token: string }>()
);

// Set Loading State Action
export const setLoading = createAction(
  '[Auth] Set Loading',
  props<{ loading: boolean }>()
);

// Handle Errors
export const setError = createAction(
  '[Auth] Set Error',
  props<{ error: string | null }>()
);

// Clear State (For Logout)
export const clearAuthState = createAction('[Auth] Clear State');
