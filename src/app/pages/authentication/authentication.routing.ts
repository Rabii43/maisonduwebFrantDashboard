import { Routes } from '@angular/router';

import { AppErrorComponent } from './error/error.component';
import { AppMaintenanceComponent } from './maintenance/maintenance.component';
import { AppSideForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AppLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'error',
        component: AppErrorComponent,
      },
      {
        path: 'maintenance',
        component: AppMaintenanceComponent,
      },
      {
        path: 'forgot-pwd',
        component: AppSideForgotPasswordComponent,
      },
      {
        path: 'login',
        component: AppLoginComponent,
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
      },
    ],
  },
];
