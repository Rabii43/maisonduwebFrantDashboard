import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppSettings, defaults } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private notify$ = new BehaviorSubject<Record<string, any>>({});

  getOptions() {
    return this.options;
  }

  setOptions(options: AppSettings) {
    this.options = Object.assign(defaults, options);
    this.notify$.next(this.options);
  }

  private options = defaults;
}
