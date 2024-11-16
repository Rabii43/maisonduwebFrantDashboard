// widget.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WidgetState } from './widget.reducer';

export const selectWidgetState = createFeatureSelector<WidgetState>('widgets');

export const selectRows = createSelector(selectWidgetState, (state) => state.rows);
