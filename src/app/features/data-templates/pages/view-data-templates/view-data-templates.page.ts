import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { DividerModule } from 'primeng/divider';

import { dataTemplates } from '@app/dummy-data/dummy-data-templates.dummy-data';

import { WithBackButtonLayoutComponent } from '@shared/layouts/with-back-button/with-back-button.layout';
import { DataTemplateBasicDetails } from '@shared/types/data-template.type';
@Component({
  selector: 'app-view-data-templates',
  styleUrls: ['./view-data-templates.page.scss'],
  templateUrl: './view-data-templates.page.html',
  standalone: true,
  imports: [
    IonContent,
    WithBackButtonLayoutComponent,
    RouterLink,
    DividerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ViewDataTemplatesPage {
  dataTemplates = dataTemplates
}
