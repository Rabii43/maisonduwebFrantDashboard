import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {updateWidgets} from './widget.actions';
import {Store} from '@ngrx/store';

@Injectable()
export class WidgetEffects {
  saveWidgets$ = createEffect(() =>
      this.actions$.pipe(
        ofType(updateWidgets),
      ),
    {dispatch: false}
  );

  constructor(private actions$: Actions, private store: Store) {
  }
}
