import { Component } from '@angular/core';
import { WithBackButtonLayoutComponent } from '@app/shared/layouts/with-back-button/with-back-button.layout';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-create-data-template-basic-details',
  styleUrls: ['./create-data-template-basic-details.page.scss'],
  templateUrl: './create-data-template-basic-details.page.html',
  standalone: true,
  imports: [IonContent, WithBackButtonLayoutComponent],
})
export class CreateDataTemplateBasicDetailsPage {}
