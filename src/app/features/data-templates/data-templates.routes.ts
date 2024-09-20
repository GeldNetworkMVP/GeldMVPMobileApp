import { Routes } from '@angular/router';
import { provideStates } from '@ngxs/store';

import { DataTemplatesState } from './stores/data-templates-store/data-templates.state';
import { NewDataTemplateState } from './stores/new-data-template-store/new-data-template.state';

export const dataTemplatesRoutes: Routes = [
  {
    path: 'data-templates',
    children: [
      {
        path: 'create',
        children: [
          {
            path: 'basic-details',
            loadComponent: () =>
              import(
                '@data-templates/pages/create-data-template-basic-details/create-data-template-basic-details.page'
              ).then((m) => m.CreateDataTemplateBasicDetailsPage),
          },
          {
            path: 'detailed',
            loadComponent: () =>
              import(
                '@data-templates/pages/create-data-template-detailed/create-data-template-detailed.page'
              ).then((m) => m.CreateDataTemplateDetailedPage),
          },
        ],
        providers: [provideStates([NewDataTemplateState])],
      },
      {
        path: 'view',
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                '@data-templates/pages/view-data-templates/view-data-templates.page'
              ).then((m) => m.ViewDataTemplatesPage),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                '@data-templates/pages/view-selected-data-template/view-selected-data-template.page'
              ).then((m) => m.ViewSelectedDataTemplatePage),
          },
        ],
        providers: [provideStates([DataTemplatesState])],
      },
    ],
  },
];
