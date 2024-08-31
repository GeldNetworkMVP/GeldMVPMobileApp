import { Component } from '@angular/core';
import { IonToolbar, IonHeader, IonContent, IonTitle } from "@ionic/angular/standalone";
import {ButtonModule} from 'primeng/button'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonTitle, IonContent, IonHeader, IonToolbar, ButtonModule],
  standalone: true
})
export class HomePage {}
