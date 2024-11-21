import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlankComponent} from './layouts/blank/blank.component';
import {FullComponent} from './layouts/full/full.component';
import {AuthGuard} from "./pages/authentication/helpers/authGuard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/authentication/login',
        pathMatch: 'full',
      },
      // {
      //   path: 'dashboards',
      //   canActivate: [AuthGuard],
      //   loadComponent: () =>
      //     import('./pages/apps/dashboard/dashboard.component').then(
      //       (c) => c.AppDashboard1Component),
      // },
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/apps/apps.module').then((m) => m.AppsModule),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
