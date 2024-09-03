import { Component } from "@angular/core";
import { WithBackButtonLayoutComponent } from "@app/shared/layouts/with-back-button/with-back-button.layout";
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-view-data-templates',
  styleUrls: ['./view-data-templates.page.scss'],
  templateUrl: './view-data-templates.page.html',
  standalone: true,
  imports: [IonContent, WithBackButtonLayoutComponent],
})
export class ViewDataTemplatesPage {}