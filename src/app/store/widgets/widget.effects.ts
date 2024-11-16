// widget.effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { updateWidgets } from './widget.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class WidgetEffects {
  saveWidgetsToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateWidgets), // Listen for the `updateWidgets` action
        tap(({ rows }) => {
          // Save the rows data to localStorage when state is updated
          localStorage.setItem('widgets', JSON.stringify({ rows }));
        })
      ),
    { dispatch: false } // No action is dispatched as a result of this effect
  );

  constructor(private actions$: Actions) {}
}
