import {Component, OnInit} from '@angular/core';
import {TablerIconsModule} from 'angular-tabler-icons';
// components
import {
  AppCongratulateCardComponent
} from '../../../components/dashboard1/congratulate-card/congratulate-card.component';
import {AppPaymentsComponent} from '../../../components/dashboard1/payments/payments.component';
import {AppProductsComponent} from '../../../components/dashboard1/products/products.component';
import {AppCustomersComponent} from '../../../components/dashboard1/customers/customers.component';
import {AppTopProjectsComponent} from '../../../components/dashboard1/top-projects/top-projects.component';
import {AppVisitUsaComponent} from '../../../components/dashboard1/visit-usa/visit-usa.component';
import {AppLatestReviewsComponent} from '../../../components/dashboard1/latest-reviews/latest-reviews.component';
import {AppLatestDealsComponent} from "../../../components/dashboard1/latest-deals/latest-deals.component";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {AsyncPipe, CurrencyPipe, JsonPipe, NgClass, NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import {selectRows} from "../../../store/widgets/widget.selectors";
import {Store} from "@ngrx/store";
import {loadWidgets, updateWidgets} from "../../../store/widgets/widget.actions";
import {WebsocketService} from "../../../websoketService/websoket.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TablerIconsModule,
    AppCongratulateCardComponent,
    AppCustomersComponent,
    AppProductsComponent,
    AppTopProjectsComponent,
    AppPaymentsComponent,
    AppLatestDealsComponent,
    AppVisitUsaComponent,
    AppProductsComponent,
    AppLatestReviewsComponent,
    AppLatestDealsComponent,
    CdkDropList,
    CdkDrag,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    NgClass,
    AsyncPipe,
    CurrencyPipe,
    JsonPipe,
  ],
  templateUrl: './dashboard.component.html',
})
export class AppDashboard1Component implements OnInit {

  rows$ = this.store.select(selectRows); // Use selector to retrieve rows from the store
  realTimeData: any;

  constructor(
    private store: Store,
    private websocketService: WebsocketService) {
  }

  ngOnInit(): void {
    console.log(this.rows$, 'this row')
    this.websocketService.listen('message').subscribe((data: any) => {
      this.realTimeData = data;
      console.log('Received real-time data:', data);
    });
    // Dispatch an action to load widgets from localStorage when app initializes
    this.store.dispatch(loadWidgets());
  }

  dropRow(event: CdkDragDrop<any[]>, rowId: number) {
    this.rows$.subscribe((rows) => {
      const row = rows.find((r) => r.id === rowId);
      if (row) {
        moveItemInArray(row.pages, event.previousIndex, event.currentIndex);
        this.store.dispatch(updateWidgets({rows})); // Dispatch updated rows to the store
      }
    });
  }

  drop(event: CdkDragDrop<any[]>) {
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
