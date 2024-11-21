import {Routes} from '@angular/router';
import {AppUserComponent} from './user/user.component';
import {AppWidgetsComponent} from "./setting/widgets/widgets.component";
import {AppDashboard1Component} from "./dashboard/dashboard.component";


export const AppsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        component: AppUserComponent,
      },
      {
        path: 'setting-widgets',
        component: AppWidgetsComponent,
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'dashboards',
        component: AppDashboard1Component,
        data: {
          title: 'Dashboard',
        },
      },
    ],
  },
];
