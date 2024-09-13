import { Component, computed } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { injectParams } from 'ngxtension/inject-params';

import { dataTemplates } from '@app/dummy-data/dummy-data-templates.dummy-data';
import { commonModules } from '@app/shared/common.modules';
import { WithBackButtonLayoutComponent } from '@app/shared/layouts/with-back-button/with-back-button.layout';

@Component({
  selector: 'app-view-selected-data-template',
  styleUrls: ['./view-selected-data-template.page.scss'],
  templateUrl: './view-selected-data-template.page.html',
  standalone: true,
  imports: [IonContent, WithBackButtonLayoutComponent, ...commonModules],
})
export class ViewSelectedDataTemplatePage {
  dataTemplateId = injectParams('id');

  selectedDataTemplate = computed(() => {
    return dataTemplates.find(
      (dataTemplate) => dataTemplate.id === this.dataTemplateId()
    );
  });
}
