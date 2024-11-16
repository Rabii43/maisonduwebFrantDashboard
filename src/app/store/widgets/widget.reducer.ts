// widget.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { updateWidgets } from './widget.actions';

export interface WidgetState {
  rows: any[];
}

const loadStateFromLocalStorage = () => {
  try {
    const state = localStorage.getItem('widgets');
    return state ? JSON.parse(state) : undefined; // If there's no data, return undefined
  } catch (error) {
    console.error('Error loading widgets from localStorage', error);
    return undefined;
  }
};

const initialState: WidgetState = {
  rows: loadStateFromLocalStorage() || [
    {
      id: 1,
      pages: [
        { id: 1, component: 'app-congratulate-card', size: 'col-lg-6' },
        { id: 2, component: 'app-payments', size: 'col-lg-3' },
        { id: 3, component: 'app-products', size: 'col-lg-3' },
      ],
    },
    {
      id: 2,
      pages: [
        { id: 4, component: 'app-latest-deals', size: 'col-lg-6' },
        { id: 5, component: 'app-customers', size: 'col-lg-6' },
      ],
    },
    {
      id: 3,
      pages: [{ id: 6, component: 'app-latest-reviews', size: 'col-lg-12' }],
    },
  ],
};

export const widgetReducer = createReducer(
  initialState,
  on(updateWidgets, (state, { rows }) => ({
    ...state,
    rows: [...rows], // Update rows in the state
  }))
);
