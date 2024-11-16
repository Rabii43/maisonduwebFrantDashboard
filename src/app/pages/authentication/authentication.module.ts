import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// icons
import {TablerIconsModule} from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import {AuthenticationRoutes} from './authentication.routing';

import {AppErrorComponent} from './error/error.component';
import {AppMaintenanceComponent} from './maintenance/maintenance.component';
import {AppSideForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {AppSideRegisterComponent} from './register/register.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "../../store/auth/auth.effects";
import {DashboardEffects} from "../../store/dashboard/dashboard.effects";
import {authReducer} from "../../store/auth/auth.reducer";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    MatIconModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects, DashboardEffects]),
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    AppErrorComponent,
    AppMaintenanceComponent,
    AppSideForgotPasswordComponent,
    AppSideRegisterComponent,
  ],
})
export class AuthenticationModule {
}

class AuthenticationModuleImpl extends AuthenticationModule {
}
