import { createReducer, on } from '@ngrx/store';
import { loadKPISuccess, loadKPIFailure } from './dashboard.actions';

export interface DashboardState {
  kpis: any[];
  error: string | null;
}

export const initialState: DashboardState = { kpis: [], error: null };

export const dashboardReducer = createReducer(
  initialState,
  on(loadKPISuccess, (state, { kpis }) => ({ ...state, kpis, error: null })),
  on(loadKPIFailure, (state, { error }) => ({ ...state, error }))
);
