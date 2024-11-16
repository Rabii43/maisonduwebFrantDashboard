import {Routes} from '@angular/router';

// dashboards
import {AppDashboard1Component} from './dashboard1/dashboard1.component';

export const DashboardsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AppDashboard1Component,
        data: {
          title: 'Dashboard',
        },
      },
    ],
  },
];
