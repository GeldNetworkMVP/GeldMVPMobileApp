import { DatePipe } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonToolbar,
  IonHeader,
  IonContent,
  IonTitle,
  IonMenu,
  IonMenuToggle,
  IonButton,
} from '@ionic/angular/standalone';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { timer } from 'rxjs';

import { WeatherDisplayComponent } from '@app/features/weather-data/components/weather-display/weather-display.component';

import { SideNavItem } from '@features/home/types/side-nav-item.type';


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
export class HomeScreenPage {
  private readonly router = inject(Router);
  @ViewChild(IonMenu) menu!: IonMenu;

  goTo(route: string) {
    this.router.navigate([route]);
    timer(500).subscribe(() => this.menu.close());
  }

  logout() {
    console.log('logout');
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
      action: this.logout,
      icon: 'lucide:log-out',
    },
  ];
}
