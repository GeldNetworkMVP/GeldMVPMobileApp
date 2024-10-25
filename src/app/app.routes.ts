import { dataTemplatesRoutes } from '@data-templates/data-templates.routes';

import { authenticationRoutes } from '@features/authentication/authentication.routes';

import { homeRoutes } from '@home/home.routes';

import { informationalRoutes } from '@informational/informational.routes';

import { profileRoutes } from './features/profile/profile.routes';

export const appRoutes = [
  ...homeRoutes,
  ...informationalRoutes,
  ...dataTemplatesRoutes,
  ...profileRoutes,
  ...authenticationRoutes
];
