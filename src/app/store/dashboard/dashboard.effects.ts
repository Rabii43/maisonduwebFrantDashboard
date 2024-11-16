import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { loadKPI, loadKPISuccess, loadKPIFailure } from './dashboard.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {DashboardService} from "../../pages/_services/dashboard/dashboard.service";

@Injectable()
export class DashboardEffects {
  constructor(private actions$: Actions, private dashboardService: DashboardService) {}

  loadKPI$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadKPI),
      mergeMap(() =>
        this.dashboardService.getKPIData().pipe(
          map(kpis => loadKPISuccess({ kpis })),
          catchError(error => of(loadKPIFailure({ error })))
        )
      )
    )
  );
}
