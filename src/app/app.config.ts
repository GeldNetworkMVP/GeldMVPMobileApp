import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';
import { IonicModule } from '@ionic/angular';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
// import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { provideStore } from '@ngxs/store';
import { MessageService, PrimeNGConfig } from 'primeng/api';

import { AuthInterceptor } from '@features/authentication/interceptors/auth.interceptor';
import { AuthState } from '@features/authentication/stores/auth-store/auth.state';

import config from '../../capacitor.config';
import { appRoutes } from './app.routes';
import { MetadataState } from './shared/stores/metadata.state';

const redirect_uri = `${config.appId}://dev-0l5komhx4zv7zk1x.us.auth0.com/capacitor/${config.appId}/callback`;

const initializePrimeNGConfig = (primeConfig: PrimeNGConfig) => () => {
  primeConfig.ripple = true;
};

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MessageService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializePrimeNGConfig,
      deps: [PrimeNGConfig],
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    provideRouter(appRoutes),
    provideIonicAngular(),
    importProvidersFrom(
      IonicModule.forRoot({}),
      AuthModule.forRoot({
        domain: 'dev-0l5komhx4zv7zk1x.us.auth0.com',
        clientId: 'Mp9IYaVGC2k31gDpWGBcU7SIFofXVla7',
        useRefreshTokens: true,
        useRefreshTokensFallback: false,
        authorizationParams: {
          redirect_uri,
        },
      })
    ),
    provideAnimations(),
    provideStore(
      [MetadataState, AuthState],
      withNgxsReduxDevtoolsPlugin(),
      // withNgxsLoggerPlugin()
    ),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
