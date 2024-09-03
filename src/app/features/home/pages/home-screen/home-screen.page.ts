import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
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

type SideNavItem = {
  label: string;
  icon?: string;
  route?: string;
  action?: () => void;
};

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
      label: 'Edit User Profile',
      route: '/edit-user-profile',
    },
    {
      label: 'New Data Template',
      route: '/new-data-template',
    },
    {
      label: 'View Data Templates',
      route: '/view-data-templates',
    },
    {
      label: 'Logout',
      action: this.logout,
      icon: 'lucide:log-out',
    },
  ];
}
