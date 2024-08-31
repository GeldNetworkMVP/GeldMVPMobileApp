import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonContent } from "@ionic/angular/standalone";
import { ButtonModule } from "primeng/button";
import { NgOptimizedImage } from "@angular/common";
import { ButtonComponent } from "@shared/components/button/button.component";

@Component({
  selector: 'app-welcome-screen',
  standalone: true,
  templateUrl: './welcome-screen.page.html',
  styleUrls: ['./welcome-screen.page.scss'],
  imports: [IonContent, ButtonModule, ButtonComponent, NgOptimizedImage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WelcomeScreenPage { }
