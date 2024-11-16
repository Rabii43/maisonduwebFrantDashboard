import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgxPermissionsModule } from 'ngx-permissions';

import { NgxPaginationModule } from 'ngx-pagination';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgScrollbarModule } from 'ngx-scrollbar';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppUserComponent } from './user/user.component';
import { AppEmployeeDialogContentComponent } from './user/user.component';
import { AppAddUserComponent } from './user/add/add.component';

import { AppsRoutes } from './apps.routing';
import { MatNativeDateModule } from '@angular/material/core';

import {AppWidgetsComponent} from "./setting/widgets/widgets.component";
import {AppCongratulateCardComponent} from "../../components/dashboard1/congratulate-card/congratulate-card.component";
import {AppCustomersComponent} from "../../components/dashboard1/customers/customers.component";
import {AppLatestDealsComponent} from "../../components/dashboard1/latest-deals/latest-deals.component";
import {AppLatestReviewsComponent} from "../../components/dashboard1/latest-reviews/latest-reviews.component";
import {AppPaymentsComponent} from "../../components/dashboard1/payments/payments.component";
import {AppProductsComponent} from "../../components/dashboard1/products/products.component";
import {WidgetEffects} from "../../store/widgets/widget.effects";
import {widgetReducer} from "../../store/widgets/widget.reducer";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AppsRoutes),
    MaterialModule,
    FormsModule,
    StoreModule.forFeature('widgets', widgetReducer),
    EffectsModule.forFeature([WidgetEffects]),
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    NgApexchartsModule,
    TablerIconsModule.pick(TablerIcons),
    DragDropModule,
    NgxPaginationModule,
    HttpClientModule,
    AngularEditorModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatNativeDateModule,
    NgScrollbarModule,
    AppCongratulateCardComponent,
    AppCustomersComponent,
    AppLatestDealsComponent,
    AppLatestReviewsComponent,
    AppPaymentsComponent,
    AppProductsComponent,
    AppWidgetsComponent,
  ],
  exports: [TablerIconsModule],
  declarations: [
    AppUserComponent,
    AppEmployeeDialogContentComponent,
    AppAddUserComponent,
  ],
  providers: [DatePipe],
})
export class AppsModule {}
