import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SideNavItem } from '@shared/types/side-nav-item.type';
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})
export class HomeScreenPage {
  router = inject(Router);

  goTo(route: string) {
    this.router.navigate([route]);
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
