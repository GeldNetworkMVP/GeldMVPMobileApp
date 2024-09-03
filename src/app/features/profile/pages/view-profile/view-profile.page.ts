import { Component } from "@angular/core";
import { WithBackButtonLayoutComponent } from "@app/shared/layouts/with-back-button/with-back-button.layout";
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-view-profile',
  styleUrls: ['./view-profile.page.scss'],
  templateUrl: './view-profile.page.html',
  standalone: true,
  imports: [IonContent, WithBackButtonLayoutComponent],
})
export class ViewProfilePage {}