import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonToolbar, IonHeader, IonContent, IonTitle, IonMenu, IonMenuToggle, IonButton } from "@ionic/angular/standalone";
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonTitle, IonContent, IonHeader, IonButton, IonToolbar, IonMenu, IonMenuToggle, ButtonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true
})
export class HomePage { }
