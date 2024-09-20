import { NgOptimizedImage } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { IonContent } from '@ionic/angular/standalone';
import { ButtonModule } from 'primeng/button';

import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-welcome-screen',
  standalone: true,
  templateUrl: './welcome-screen.page.html',
  styleUrls: ['./welcome-screen.page.scss'],
  imports: [IonContent, ButtonModule, ButtonComponent, NgOptimizedImage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WelcomeScreenPage {
  authService = inject(AuthService);

  login() {
    this.authService
      .loginWithRedirect({
        async openUrl(url: string) {
          await Browser.open({ url, windowName: '_self' });
        }
      })
      .subscribe();
  }
}
