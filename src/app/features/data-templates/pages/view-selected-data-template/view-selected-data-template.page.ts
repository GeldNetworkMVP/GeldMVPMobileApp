import { Component, computed, inject } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { injectParams } from 'ngxtension/inject-params';
import { DividerModule } from 'primeng/divider';

import { commonModules } from '@app/shared/common.modules';
import { WithBackButtonLayoutComponent } from '@app/shared/layouts/with-back-button/with-back-button.layout';

import { DataTemplatesState } from '@data-templates/stores/data-templates-store/data-templates.state';

import { eachWordsFirstLetterCapitalized } from '@shared/utils/input-fields.util';

@Component({
  selector: 'app-view-selected-data-template',
  styleUrls: ['./view-selected-data-template.page.scss'],
  templateUrl: './view-selected-data-template.page.html',
  standalone: true,
  imports: [
    IonContent,
    WithBackButtonLayoutComponent,
    DividerModule,
    ...commonModules,
  ],
})
export class ViewSelectedDataTemplatePage {
  store = inject(Store);

  dataTemplateId = injectParams('id');

  dataTemplates = this.store.selectSignal(DataTemplatesState.getTemplates);

  selectedDataTemplate = computed(() => {
    const template = this.dataTemplates().find(
      (dataTemplate) => dataTemplate._id === this.dataTemplateId()
    );
    return template;
  });

  plotDetails = computed(() => {
    const selectedDataTemplate = this.selectedDataTemplate();
    return selectedDataTemplate?.plot;
  });

  workflowDetails = computed(() => {
    const selectedDataTemplate = this.selectedDataTemplate();
    return selectedDataTemplate?.workflow;
  });

  stageDetails = computed(() => {
    const selectedDataTemplate = this.selectedDataTemplate();
    return selectedDataTemplate?.stage;
  });

  keyValues = computed(() => {
    const selectedTemplate = { ...this.selectedDataTemplate() };
    delete selectedTemplate.currentHash;
    delete selectedTemplate.prevHash;
    delete selectedTemplate.templateHash;
    delete selectedTemplate.timestamp;
    delete selectedTemplate.userid;
    delete selectedTemplate._id;
    delete selectedTemplate.geocoordinates;
    delete selectedTemplate.stage;
    delete selectedTemplate.workflow;
    delete selectedTemplate.plot;
    delete selectedTemplate.templatename;

    return Object.entries(
      selectedTemplate as Record<
        string,
        { collectionname: string } | string | number
      >
    );
  });

  getTypedValue(value: any) {
    return typeof value === 'object'
      ? (value as { collectionname: string }).collectionname
      : (value as string | number);
  }

  eachWordFirstLetterCapitalized(str: string): string {
    return eachWordsFirstLetterCapitalized(str);
  }
}
