import { Component, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { SafeArea } from 'capacitor-plugin-safe-area';
import {DropdownModule} from 'primeng/dropdown'
import { InputTextModule } from 'primeng/inputtext';

import { WithBackButtonLayoutComponent } from '@app/shared/layouts/with-back-button/with-back-button.layout';

import { commonModules } from '@shared/common.modules';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CountryCodeInputComponent } from '@shared/components/country-code-telephone-input/country-code-telephone-input.component';
import { DESIGNATIONS } from '@shared/constants/designations.constant';
import { designationValidator, matchValidator } from '@shared/utils/form-validations.util';

@Component({
  selector: 'app-register',
  styleUrls: ['./register.page.scss'],
  templateUrl: './register.page.html',
  standalone: true,
  imports: [
    ButtonComponent,
    DropdownModule,
    IonContent,
    WithBackButtonLayoutComponent,
    InputTextModule,
    CountryCodeInputComponent,
    ...commonModules,
  ],
})
export class RegisterPage implements OnInit {

  designationOptions = DESIGNATIONS

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
      designation : new FormControl('', [Validators.required, designationValidator()]),
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
}
