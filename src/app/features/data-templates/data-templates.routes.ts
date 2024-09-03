import { Routes } from '@angular/router';

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
        ],
      }
    ],
  },
];
