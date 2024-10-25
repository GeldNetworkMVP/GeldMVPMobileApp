import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast'

import { AuthenticationService } from '@features/authentication/services/authentication.service';
import { AuthState } from '@features/authentication/stores/auth-store/auth.state';

import { commonModules } from '@shared/common.modules';
import { ButtonComponent } from '@shared/components/button/button.component';
import { WithBackButtonLayoutComponent } from '@shared/layouts/with-back-button/with-back-button.layout';

@Component({
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    ButtonComponent,
    WithBackButtonLayoutComponent,
    IonContent,
    InputTextModule,
    ToastModule,
    ...commonModules,
  ],
})
export class LoginPage implements OnInit {

  authenticationService = inject(AuthenticationService);
  messageService = inject(MessageService);
  store = inject(Store);
  router = inject(Router);

  loginEmail = this.store.selectSignal(AuthState.getLoginEmail);

  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });

  pageHeight = signal('');

  ngOnInit(): void {
    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
      const height = `calc(100vh - ${200 + statusBarHeight}px)`;
      this.pageHeight.set(height);
    });

    if(!this.loginEmail()) {
      this.router.navigate(['/login-or-register']);
    }
  }

  submitting = signal(false);
  onSubmit() {
    this.submitting.set(true);
    const password = this.form.get('password')?.value;
    const email = this.loginEmail();

    if(email && password) {
      this.authenticationService.login({
        email,
        pw: password
      }).subscribe({
        next: () => {
          this.submitting.set(false);
          this.router.navigate(['/home']);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login successful',
          });
        },
        error: (error) => {
          this.submitting.set(false);
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid email or password',
          });
        }
      })
    }
  }
}
