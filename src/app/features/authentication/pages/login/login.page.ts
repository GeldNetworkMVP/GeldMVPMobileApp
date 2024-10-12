import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { InputTextModule } from 'primeng/inputtext';

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
    ...commonModules,
  ],
})
export class LoginPage implements OnInit {
  form = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.email]),
  });

  pageHeight = signal('');

  ngOnInit(): void {
    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
      const height = `calc(100vh - ${200 + statusBarHeight}px)`;
      this.pageHeight.set(height);
    });
  }

  onSubmit() {
    const password = this.form.get('password')?.value;
  }
}
