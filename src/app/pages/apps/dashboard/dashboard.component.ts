import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {selectRows} from "../../../store/widgets/widget.selectors";
import {Store} from "@ngrx/store";
import {loadWidgets, updateWidgets} from "../../../store/widgets/widget.actions";
import {WebsocketService} from "../../../websoketService/websoket.service";
import {Apollo, gql} from "apollo-angular";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

// Define the interface for your real-time data
interface DashTable {
  id: string;
  currency_pair: string;
  rate: number;
  timestamp: string;
}

// GraphQL subscription query
const GET_REALTIME_CURRENCY_RATES = gql`
  subscription {
    currency_rates {
      id
      currency_pair
      rate
      timestamp
    }
  }
`;

class resonance {
  currency: DashTable[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class AppDashboard1Component implements OnInit {
  rows$ = this.store.select(selectRows);
  // Real-time data observable
  realTimeData$: Observable<void>;

  constructor(
    private store: Store,
    private apollo: Apollo,
    private websocketService: WebsocketService
  ) {
  }

  ngOnInit(): void {
    // Dispatch action to load widgets when the component initializes
    this.store.dispatch(loadWidgets());
    // Subscribe to the real-time currency rates
    this.subscribeToRealTimeCurrencyRates();
  }

  subscribeToRealTimeCurrencyRates(): void {
    this.realTimeData$ = this.apollo.subscribe<resonance>({
      query: GET_REALTIME_CURRENCY_RATES,
    }).pipe(
      map(result => {
        result.data?.currency
      })
    );
    // Log the real-time data
    this.realTimeData$.subscribe(
      data => console.log('Real-time data:', data),
      error => console.error('Subscription error:', error)
    );
  }

  dropRow(event: CdkDragDrop<any[]>, rowId: number): void {
    this.rows$.subscribe((rows) => {
      const row = rows.find((r) => r.id === rowId);
      if (row) {
        moveItemInArray(row.pages, event.previousIndex, event.currentIndex);
        this.store.dispatch(updateWidgets({rows})); // Dispatch updated rows to the store
      }
    });
  }

  /**
   * Handles drag-and-drop between containers.
   * @param event - Drag-and-drop event
   */
  drop(event: CdkDragDrop<any[]>): void {
    this.rows$.subscribe((rows) => {
      if (event.container === event.previousContainer) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
      this.store.dispatch(updateWidgets({rows})); // Dispatch updated rows to the store
    });
  }
}
