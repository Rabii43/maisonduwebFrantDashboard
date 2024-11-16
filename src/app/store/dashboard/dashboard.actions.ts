import { createAction, props } from '@ngrx/store';

export const loadKPI = createAction('[Dashboard] Load KPI');
export const loadKPISuccess = createAction('[Dashboard] Load KPI Success', props<{ kpis: any[] }>());
export const loadKPIFailure = createAction('[Dashboard] Load KPI Failure', props<{ error: any }>());
