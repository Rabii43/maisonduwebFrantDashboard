import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../_service/auth.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {UserApiModel} from "../../../_models/users";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {
  loading = true;
  isEditFailed = false;
  message?: string = '';
  valid?: boolean;
  oldPpassword: string;
  editPasswordForm: FormGroup;
  user!: UserApiModel;
  hide = true;
  submit = false;
  editFormSubmitted: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService
  ) {
    this.editPasswordForm = this.formBuilder.group(
      {
        oldPpassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6)
          ])
        ],
        newPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6)
          ])
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: [this.checkIfMatchingPasswords('newPassword', 'confirmPassword'),
          this.checkIfMatchingOldPasswords('oldPpassword', 'newPassword')]
      }
    );
  }

  get formControler(): { [key: string]: AbstractControl } {
    return this.editPasswordForm.controls;
  }

  ngOnInit(): void {
    this.user = new UserApiModel();
    this.user.id = this.authService.decodeToken().id;
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string): (group: FormGroup) => void {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  onSubmit() {
    this.editFormSubmitted = true;
    this.spinnerService.show();
    if (this.editPasswordForm.invalid) {
      this.loading = false;
      return;
    }
    this.oldPpassword = this.formControler['oldPpassword'].value.toString();
    this.user.password = this.formControler['newPassword'].value.toString();
    this.submit = true;
    this.loading = true;
    this.authService.editPassowrd(this.user.id, this.oldPpassword, this.user.password).subscribe(
      (data) => {
        this.spinnerService.hide();
        if (data['code'] === 409) {
          this.changePasswordFailed(data.message);
        }
        if (data['code'] === 200) {
          this.isEditFailed = false;
          this.toastr.success(data.message, 'Succès')
          this.authService.signOut();
        }
      },
      () => {
        this.spinnerService.hide();
        this.isEditFailed = true;
      }
    );
  }

  checkIfMatchingOldPasswords(passwordKey: string, passwordConfirmationKey: string): (group: FormGroup) => void {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value === passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({Equivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  private changePasswordFailed(message) {
    this.isEditFailed = true;
    this.message = message;
  }
}
