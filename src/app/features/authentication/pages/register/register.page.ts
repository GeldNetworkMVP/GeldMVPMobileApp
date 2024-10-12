import { Component, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { NgxCountriesDropdownModule } from 'ngx-countries-dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { WithBackButtonLayoutComponent } from '@app/shared/layouts/with-back-button/with-back-button.layout';

import { commonModules } from '@shared/common.modules';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CountryCodeInputComponent } from '@shared/components/country-code-telephone-input/country-code-telephone-input.component';
import { matchValidator } from '@shared/utils/form-validations.util';

@Component({
  selector: 'app-register',
  styleUrls: ['./register.page.scss'],
  templateUrl: './register.page.html',
  standalone: true,
  imports: [
    ButtonComponent,
    IonContent,
    WithBackButtonLayoutComponent,
    InputTextModule,
    CountryCodeInputComponent,
    ...commonModules,
  ],
})
export class RegisterPage implements OnInit {
  pageHeight = signal('');

  ngOnInit(): void {
    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
      this.pageHeight.set(`calc(100vh - ${100 + statusBarHeight}px)`);
    });
  }

  contactNumberFormGroup = new FormGroup({
    countryCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+\d+$/),
    ]),
    number: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]),
  });

  profileFormGroup = new FormGroup(
    {
      email: new FormControl('nethsara@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      contactNumber: this.contactNumberFormGroup,
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    {
      validators: matchValidator('password', 'confirmPassword'),
    }
  );

  onSubmit() {
    console.log(this.profileFormGroup.value);
  }

  // customPasswordValidator() {
  //   return this.profileFormGroup.get('password')?.value ===
  //     this.profileFormGroup.get('confirmPassword')?.value
  //     ? null
  //     : { passwordMismatch: true };
  // }

  // matchValidator(controlName: string, matchingControlName: string) {
  //   return (formGroup: FormGroup): ValidationErrors | null => {
  //     const control = formGroup.get(controlName);
  //     const matchingControl = formGroup.get(matchingControlName);

  //     if (!control || !matchingControl) {
  //       return null;
  //     }

  //     if (control.value !== matchingControl.value) {
  //       return { mismatchedPasswords: true };
  //     } else {
  //       return null;
  //     }
  //   };
  // }
}
