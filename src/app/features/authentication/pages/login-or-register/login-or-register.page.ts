import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { InputTextModule } from 'primeng/inputtext';

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
    ...commonModules,
  ],
})
export class LoginOrRegisterPage implements OnInit {
  router = inject(Router);
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

  onSubmit() {
    const email = this.form.get('email')?.value;
    if (email === 'a@gmail.com') {
      this.goToRegisterPage();
    } else this.goToLoginPage();
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  goToRegisterPage() {
    this.router.navigate(['/register']);
  }
}
