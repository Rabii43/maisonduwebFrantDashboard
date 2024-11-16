import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AuthState} from '../../../store/auth/auth.reducer';
import * as AuthActions from '../../../store/auth/auth.actions';
import {MaterialModule} from "../../../material.module";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    MaterialModule,
    RouterLink,
    ReactiveFormsModule
  ],
  standalone: true
})
export class AppLoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;
  loginFormSubmitted: boolean = false;

  constructor(
    private store: Store<AuthState>,
    private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.loading$ = this.store.select((state) => state.loading);
    this.errorMessage$ = this.store.select((state) => state.error);
  }

  get formControler(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const email = this.formControler['email'].value;
    const password = this.formControler['password'].value;
    this.store.dispatch(AuthActions.login({email, password}));
  }

  @HostListener('unloaded')
  ngOnDestroy(): void {
  }
}
