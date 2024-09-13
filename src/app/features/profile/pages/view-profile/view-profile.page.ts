import { Component } from "@angular/core";
import { IonContent } from "@ionic/angular/standalone";

import { WithBackButtonLayoutComponent } from "@app/shared/layouts/with-back-button/with-back-button.layout";

@Component({
  selector: 'app-view-profile',
  styleUrls: ['./view-profile.page.scss'],
  templateUrl: './view-profile.page.html',
  standalone: true,
  imports: [IonContent, WithBackButtonLayoutComponent],
})
export class ViewProfilePage {}