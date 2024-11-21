import {Component, EventEmitter, Input, OnDestroy, Output, ViewEncapsulation,} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TablerIconsModule} from 'angular-tabler-icons';
import {MaterialModule} from 'src/app/material.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {selectRole, selectUser} from "../../../store/auth/auth.selectors";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import * as AuthActions from "../../../store/auth/auth.actions";

interface notifications {
  id: number;
  img: string;
  title: string;
  subtitle: string;
}

interface profiledd {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  link: string;
  color: string;
}

interface apps {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  link: string;
}

interface quicklinks {
  id: number;
  title: string;
  link: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnDestroy {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
  accessAdmin: boolean = false;
  user$ = this.store.select(selectUser);
  role$ = this.store.select(selectRole)
  private subscriptions: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private store: Store
  ) {
    const roleSubscription = this.role$.subscribe((role) => {
      this.accessAdmin = role?.includes('ROLE_ADMIN') || false; // Set accessAdmin based on role
    });

    // Add subscription to the cleanup list
    this.subscriptions.add(roleSubscription);
  }

// signOut back to login page
  signOut(): void {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(): void {
    // Clean up subscriptions.ts
    this.subscriptions.unsubscribe();
  }
}

