// widget.actions.ts
import { createAction, props } from '@ngrx/store';

export const updateWidgets = createAction(
  '[Widgets] Update Widgets',
  props<{ rows: any[] }>()
);

export const loadWidgets = createAction('[Widgets] Load Widgets');
