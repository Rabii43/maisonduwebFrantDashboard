import {Component, inject, OnInit} from '@angular/core';
import {selectRows} from "../../../store/widgets/widget.selectors";
import {Store} from "@ngrx/store";
import {loadWidgets} from "../../../store/widgets/widget.actions";
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
  apollo: Apollo = inject(Apollo);

  constructor(
    private store: Store,
    private websocketService: WebsocketService
  ) {
  }

  ngOnInit(): void {
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
}
