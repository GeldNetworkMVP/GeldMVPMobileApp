import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';

import { SetProfile } from '@features/authentication/stores/auth-store/auth.actions';

import { MetadataService } from './shared/services/metadata.service';
import { setOverlaysWebView } from './shared/utils/set-status-bar-colors.util';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonRouterOutlet, IonApp],
})
export class AppComponent implements OnInit {
  metadataService = inject(MetadataService);
  router = inject(Router);
  store = inject(Store);

  ngOnInit() {
    this.metadataService.setMetadata();
    setOverlaysWebView();
    this.refreshAuth();
  }

  async refreshAuth() {
    const token = (await Preferences.get({ key: 'token' })).value;
    const email = (await Preferences.get({ key: 'email' })).value as string;
    const designation = (await Preferences.get({ key: 'designation' }))
      .value as string;
    const contact = (await Preferences.get({ key: 'contact' })).value as string;
    const company = (await Preferences.get({ key: 'company' })).value as string;
    const userid = (await Preferences.get({ key: 'userid' })).value as string;

    if (token) {
      this.store.dispatch(
        new SetProfile({ email, designation, contact, company, userid })
      );
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/welcome']);
    }
  }
}
