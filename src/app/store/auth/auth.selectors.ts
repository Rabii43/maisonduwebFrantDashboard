import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

// Feature Selector
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Select User
export const selectUser = createSelector(selectAuthState, (state) => {return state.user});

// Select User Role
export const selectRole = createSelector(selectUser, (user) => user?.roles || null);

// Select Token
export const selectAuthToken = createSelector(selectAuthState, (state) => state.token);

// Select Loading Status
export const selectAuthLoading = createSelector(selectAuthState, (state) => state.loading);

// Select Error
export const selectAuthError = createSelector(selectAuthState, (state) => state.error);

export const selectIsLoggedIn = createSelector(selectAuthState, (state) => !!state.user);
