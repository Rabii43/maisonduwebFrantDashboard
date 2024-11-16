import {Component} from "@angular/core";
import {TablerIconsModule} from "angular-tabler-icons";
import {
  AppCongratulateCardComponent
} from "../../../../components/dashboard1/congratulate-card/congratulate-card.component";
import {AppCustomersComponent} from "../../../../components/dashboard1/customers/customers.component";
import {AppProductsComponent} from "../../../../components/dashboard1/products/products.component";
import {AppTopProjectsComponent} from "../../../../components/dashboard1/top-projects/top-projects.component";
import {AppPaymentsComponent} from "../../../../components/dashboard1/payments/payments.component";
import {AppLatestDealsComponent} from "../../../../components/dashboard1/latest-deals/latest-deals.component";
import {AppVisitUsaComponent} from "../../../../components/dashboard1/visit-usa/visit-usa.component";
import {AppLatestReviewsComponent} from "../../../../components/dashboard1/latest-reviews/latest-reviews.component";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {AsyncPipe, NgClass, NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import {updateWidgets} from "../../../../store/widgets/widget.actions";
import {Store} from "@ngrx/store";
import {selectRows} from "../../../../store/widgets/widget.selectors";

@Component({
  selector: 'app-setting',
  templateUrl: './widgets.component.html',
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
    CdkDrag,
    CdkDropList,
    NgForOf,
    NgSwitchCase,
    NgClass,
    NgSwitch,
    AsyncPipe,
  ],
})
export class AppWidgetsComponent {
  rows$ = this.store.select(selectRows); // Use selector to retrieve rows from the store

  constructor(private store: Store) {}

  dropRow(event: CdkDragDrop<any[]>, rowId: number) {
    this.rows$.subscribe((rows) => {
      const row = rows.find((r) => r.id === rowId);
      if (row) {
        moveItemInArray(row.pages, event.previousIndex, event.currentIndex);
        this.store.dispatch(updateWidgets({ rows })); // Dispatch updated rows to the store
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
      this.store.dispatch(updateWidgets({ rows })); // Dispatch updated rows to the store
    });
  }
}
