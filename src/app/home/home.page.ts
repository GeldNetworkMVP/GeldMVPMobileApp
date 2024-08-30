import { Component } from '@angular/core';
import { IonToolbar, IonHeader, IonContent, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonTitle, IonContent, IonHeader, IonToolbar],
  standalone: true
})
export class HomePage {}
