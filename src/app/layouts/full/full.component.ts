import {BreakpointObserver} from '@angular/cdk/layout';
import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {MatSidenav, MatSidenavContent, MatSidenavModule} from '@angular/material/sidenav';
import {CoreService} from 'src/app/services/core.service';
import {AppSettings} from 'src/app/app.config';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import {navItems} from './sidebar/sidebar-data';
import {AppNavItemComponent} from './sidebar/nav-item/nav-item.component';
import {MaterialModule} from 'src/app/material.module';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {TablerIconsModule} from 'angular-tabler-icons';
import {HeaderComponent} from './header/header.component';
import {AppBreadcrumbComponent} from './shared/breadcrumb/breadcrumb.component';
import {CustomizerComponent} from './shared/customizer/customizer.component';
import {AuthService} from "../../pages/authentication/_service/auth.service";
import {UserApiModel} from "../../pages/_models/users";
import {Store} from "@ngrx/store";
import {selectAuthLoading, selectRole, selectUser} from "../../store/auth/auth.selectors";
import {isUserSizesValid} from "@ng-matero/extensions/split";
import * as AuthActions from '../../store/auth/auth.actions';

const MOBILE_VIEW = 'screen and (max-width: 1023px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1100px)';
const BELOWMONITOR = 'screen and (max-width: 1099px)';

@Component({
  selector: 'app-full',
  standalone: true,
  imports: [
    RouterModule,
    AppNavItemComponent,
    MaterialModule,
    CommonModule,
    SidebarComponent,
    NgScrollbarModule,
    TablerIconsModule,
    HeaderComponent,
    AppBreadcrumbComponent,
    CustomizerComponent,
    MatSidenavModule
  ],
  templateUrl: './full.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class FullComponent implements OnInit, OnDestroy {
  navItems = navItems;
  @ViewChild('leftsidenav')
  public sidenav: MatSidenav;
  resView = false;
  @ViewChild('content', {static: true}) content!: MatSidenavContent;
  //get options from service
  options = this.settings.getOptions();
  role: String;
  accessAdmin: boolean = false;
  user: UserApiModel;
  data$: Observable<any>;
  user$ = this.store.select(selectUser);
  role$ = this.store.select(selectRole);
  loading$ = this.store.select(selectAuthLoading);
  protected readonly isUserSizesValid = isUserSizesValid;
  private layoutChangesSubscription = Subscription.EMPTY;
  private isMobileScreen = false;
  private isContentWidthFixed = true;
  private isCollapsedWidthFixed = false;
  private htmlElement!: HTMLHtmlElement;

  constructor(
    private settings: CoreService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
    private store: Store
  ) {
    this.htmlElement = document.querySelector('html')!;
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW, BELOWMONITOR])
      .subscribe((state) => {
        // SidenavOpened must be reset true when layout changes
        this.options.sidenavOpened = true;
        this.isMobileScreen = state.breakpoints[BELOWMONITOR];
        if (!this.options.sidenavCollapsed) {
          this.options.sidenavCollapsed = state.breakpoints[TABLET_VIEW];
        }
        this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW];
        this.resView = state.breakpoints[BELOWMONITOR];
      });
    // Initialize project theme with options
    this.receiveOptions(this.options);
    // This is for scroll to top
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e) => {
        this.content.scrollTo({top: 0});
      });
  }

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  get isTablet(): boolean {
    return this.resView;
  }

  ngOnInit(): void {
    this.role = this.auth.getUserRoles();
    this.accessAdmin = this.role.includes('ROLE_ADMIN');
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.resetCollapsedState();
  }

  resetCollapsedState(timer = 400) {
    setTimeout(() => this.settings.setOptions(this.options), timer);
  }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
    this.options.sidenavOpened = isOpened;
    this.settings.setOptions(this.options);
  }

  receiveOptions(options: AppSettings): void {
    this.options = options;
  }

  signOut(): void {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }
}
