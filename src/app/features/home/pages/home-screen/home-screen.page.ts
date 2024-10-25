import { DatePipe } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import {
  IonToolbar,
  IonHeader,
  IonContent,
  IonTitle,
  IonMenu,
  IonMenuToggle,
  IonButton,
} from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { timer } from 'rxjs';
import { Keypair } from 'stellar-sdk';

import { WeatherDisplayComponent } from '@app/features/weather-data/components/weather-display/weather-display.component';

import { AuthenticationService } from '@features/authentication/services/authentication.service';
import { AuthState } from '@features/authentication/stores/auth-store/auth.state';
import { SideNavItem } from '@features/home/types/side-nav-item.type';

import { MetadataService } from '@shared/services/metadata.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.page.html',
  styleUrls: ['./home-screen.page.scss'],
  imports: [
    RouterLink,
    IonTitle,
    IonContent,
    IonHeader,
    IonButton,
    IonToolbar,
    IonMenu,
    IonMenuToggle,
    ButtonModule,
    DividerModule,
    RippleModule,
    DatePipe,
    WeatherDisplayComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})
export class HomeScreenPage implements OnInit {
  authenticationService = inject(AuthenticationService);
  private readonly metadataService = inject(MetadataService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  profile = this.store.selectSignal(AuthState.getProfile);

  topHeight = signal(0);

  constructor() {}

  async ngOnInit(): Promise<void> {
    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
      this.topHeight.set(statusBarHeight);
    });
    const email = (await Preferences.get({ key: 'email' })).value as string;
    const { value } = await Preferences.get({ key: `keys-of-${email}` });
    if (!value) {
      let keypair = Keypair.random();
      this.authenticationService
        .activateAccount(keypair.publicKey())
        .subscribe(async (res) => {
          console.log('Account activated: ', res);
          const value = JSON.stringify({
            publicKey: keypair.publicKey(),
            secret: keypair.secret(),
          });
          await Preferences.set({
            key: `keys-of-${email}`,
            value,
          });
        });
    }
    this.metadataService.setMetadata();
  }

  @ViewChild(IonMenu) menu!: IonMenu;

  goTo(route: string) {
    this.router.navigate([route]);
    timer(500).subscribe(() => this.menu.close());
  }

  logout() {
    return () => {
      Preferences.remove({ key: 'token' }).then(() => {
        this.router.navigate(['/welcome']);
      });
      timer(500).subscribe(() => this.menu.close());
    };
  }

  sideNavItems: SideNavItem[] = [
    {
      label: 'View Profile',
      route: '/profile',
    },
    {
      label: 'New Data Template',
      route: '/data-templates/create/basic-details',
    },
    {
      label: 'View Data Templates',
      route: '/data-templates/view',
    },
    {
      label: 'Logout',
      action: this.logout(),
      icon: 'lucide:log-out',
    },
  ];
}
