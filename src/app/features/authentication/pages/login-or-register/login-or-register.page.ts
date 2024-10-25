import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { AuthenticationService } from '@features/authentication/services/authentication.service';
import { SetLoginEmail } from '@features/authentication/stores/auth-store/auth.actions';

import { commonModules } from '@shared/common.modules';
import { ButtonComponent } from '@shared/components/button/button.component';
import { WithBackButtonLayoutComponent } from '@shared/layouts/with-back-button/with-back-button.layout';

@Component({
  standalone: true,
  templateUrl: './login-or-register.page.html',
  styleUrls: ['./login-or-register.page.scss'],
  imports: [
    ButtonComponent,
    WithBackButtonLayoutComponent,
    IonContent,
    InputTextModule,
    ToastModule,
    ...commonModules,
  ],
})
export class LoginOrRegisterPage implements OnInit {
  authenticationService = inject(AuthenticationService);
  messageService = inject(MessageService);
  router = inject(Router);
  store = inject(Store);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  pageHeight = signal('');

  ngOnInit(): void {
    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
      const height = `calc(100vh - ${200 + statusBarHeight}px)`;
      this.pageHeight.set(height);
    });
  }

  submitting = signal(false);

  onSubmit() {
    if (this.form.valid) {
      this.submitting.set(true);
      const email = this.form.get('email')?.value as string;
      this.authenticationService.doesUserExist(email).subscribe({
        next: (response) => {
          this.submitting.set(false);
          const op = response.Response.op;
          if (op === 'No record in existence') {
            this.store.dispatch(new SetLoginEmail(email));
            this.goToRegisterPage();
          } else {
            const status = response.Response.status;
            if (status !== 'Pending') {
              this.store.dispatch(new SetLoginEmail(email));
              this.goToLoginPage();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Welcome back',
              });
            } else {
              this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: 'Please wait for admin approval',
              });
            }
          }
        },
        error: (error) => {
          this.submitting.set(false);
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Please try again',
          });
        },
      });
    }
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  goToRegisterPage() {
    this.router.navigate(['/register']);
  }
}
