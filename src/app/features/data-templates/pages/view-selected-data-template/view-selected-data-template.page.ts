import { Component, computed, inject } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { injectParams } from 'ngxtension/inject-params';

import { commonModules } from '@app/shared/common.modules';
import { WithBackButtonLayoutComponent } from '@app/shared/layouts/with-back-button/with-back-button.layout';

import { DataTemplatesState } from '@data-templates/stores/data-templates-store/data-templates.state';

@Component({
  selector: 'app-view-selected-data-template',
  styleUrls: ['./view-selected-data-template.page.scss'],
  templateUrl: './view-selected-data-template.page.html',
  standalone: true,
  imports: [IonContent, WithBackButtonLayoutComponent, ...commonModules],
})
export class ViewSelectedDataTemplatePage {
  store = inject(Store);
  
  dataTemplateId = injectParams('id');
  
  dataTemplates = this.store.selectSignal(DataTemplatesState.getTemplates);

  selectedDataTemplate = computed(() => {
    return this.dataTemplates().find(
      (dataTemplate) => dataTemplate._id === this.dataTemplateId()
    );
  });
}
