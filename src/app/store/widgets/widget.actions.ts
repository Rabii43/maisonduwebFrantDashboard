// widget.actions.ts
import { createAction, props } from '@ngrx/store';

export const updateWidgets = createAction(
  '[Dashboard] Update Widgets',
  props<{ rows: any[] }>()
);
