import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

// icons
import {TablerIconsModule} from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

// perfect scrollbar
import {NgScrollbarModule} from 'ngx-scrollbar';

//Import all material modules
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//Import Layouts
import {FullComponent} from './layouts/full/full.component';
import {BlankComponent} from './layouts/blank/blank.component';

import {FilterPipe} from './pipe/filter.pipe';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AuthService} from "./pages/authentication/_service/auth.service";
import {appInitializer} from "./pages/authentication/helpers/authInterceptor/app.initializer";
import {ErrorInterceptor} from "./pages/authentication/helpers/authInterceptor/error.interceptor";
import {JwtInterceptor} from "./pages/authentication/helpers/authInterceptor/jwt.interceptor";
import {AuthEffects} from "./store/auth/auth.effects";
import {DashboardEffects} from "./store/dashboard/dashboard.effects";
import {environment} from "./environments/environment";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {reducers} from "./store";
import {localStorageSync} from "ngrx-store-localstorage";
import {InMemoryCache} from "@apollo/client/core";
import {HttpLink} from "apollo-angular/http";
import {APOLLO_OPTIONS, ApolloModule} from "apollo-angular";

export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({
    keys: ['auth'], // Specify the state slices to persist
    rehydrate: true, // Automatically load the state on app initialization
  })(reducer);
}


export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, BlankComponent, FilterPipe,],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forRoot(reducers, {
      metaReducers: [localStorageSyncReducer],
    }),
    EffectsModule.forRoot([AuthEffects, DashboardEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    TablerIconsModule.pick(TablerIcons),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgScrollbarModule,
    FullComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => appInitializer,
      multi: true,
      deps: [AuthService]
    },
    {provide: LOCALE_ID, useValue: 'en-us'},
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'https://choice-mackerel-46.hasura.app/v1/graphql',
          headers: new HttpHeaders({
            'x-hasura-admin-secret': 'e6msOMQXXPeufT44M4roPRUkjrS7POWJbbiSyu7NXpsN4ikrNDB74N2OBy46mo70',
            'content-type': 'application/json',
          }),
        }),
      }),
      deps: [HttpLink],
    },
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    // apollo.create({
    //   link: httpLink.create({
    //     uri: 'https://choice-mackerel-46.hasura.app/v1/graphql', // Your GraphQL endpoint
    //     headers: new HttpHeaders({
    //       'x-hasura-admin-secret': 'e6msOMQXXPeufT44M4roPRUkjrS7POWJbbiSyu7NXpsN4ikrNDB74N2OBy46mo70',
    //       'content-type': 'application/json',
    //     }),
    //   }),
    //   cache: new InMemoryCache(),
    // });
  }
}
