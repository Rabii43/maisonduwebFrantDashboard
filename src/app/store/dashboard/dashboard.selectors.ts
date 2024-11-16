import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectKpis = createSelector(selectDashboardState, (state) => state.kpis);
export const selectKpiError = createSelector(selectDashboardState, (state) => state.error);
