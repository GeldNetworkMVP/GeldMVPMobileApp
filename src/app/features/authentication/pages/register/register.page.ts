import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast'

import { WithBackButtonLayoutComponent } from '@app/shared/layouts/with-back-button/with-back-button.layout';

import { SaveUserDto } from '@features/authentication/dto/save-user.dto';
import { AuthenticationService } from '@features/authentication/services/authentication.service';
import { AuthState } from '@features/authentication/stores/auth-store/auth.state';

import { commonModules } from '@shared/common.modules';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CountryCodeInputComponent } from '@shared/components/country-code-telephone-input/country-code-telephone-input.component';
import { DESIGNATIONS } from '@shared/constants/designations.constant';
import {
  designationValidator,
  matchValidator,
} from '@shared/utils/form-validations.util';

@Component({
  selector: 'app-register',
  styleUrls: ['./register.page.scss'],
  templateUrl: './register.page.html',
  standalone: true,
  imports: [
    ButtonComponent,
    DropdownModule,
    IonContent,
    ToastModule,
    WithBackButtonLayoutComponent,
    InputTextModule,
    CountryCodeInputComponent,
    ...commonModules,
  ],
})
export class RegisterPage implements OnInit {
 authenticationService = inject(AuthenticationService);
  messageService = inject(MessageService);
  store = inject(Store);

  designationOptions = DESIGNATIONS;

  pageHeight = signal('');
 enteredEmail = this.store.selectSignal(AuthState.getLoginEmail)

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
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      email: new FormControl(this.enteredEmail() ?? '', [Validators.required, Validators.email]),
      contactNumber: this.contactNumberFormGroup,
      designation: new FormControl('', [
        Validators.required,
        designationValidator(),
      ]),
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

  submitting = signal(false);
  onSubmit() {
    if(this.profileFormGroup.valid) {
      this.submitting.set(true);
      const formValue = this.profileFormGroup.value;
      const dto: SaveUserDto = {
        contact: `${formValue.contactNumber?.countryCode}${formValue.contactNumber?.number}`,
        designation: formValue.designation as string,
        email: formValue.email as string,
        encpw: formValue.password as string,
        username: formValue.username as string,
        status: "pending"
      }

      this.authenticationService.registerUser(dto).subscribe({
        next: () => {
          this.submitting.set(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registered successfully',
          });
        },
        error: (error) => {
          this.submitting.set(false);
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to register',
          });
        }
      })
    }

  }
}
