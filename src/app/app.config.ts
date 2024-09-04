import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { PrimeNGConfig } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { provideStore } from '@ngxs/store';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MetadataState } from './shared/stores/metadata.state';

const initializePrimeNGConfig = (primeConfig: PrimeNGConfig) => () => {
  primeConfig.ripple = true;
};

export const appConfig: ApplicationConfig = {
  providers: [
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
    importProvidersFrom(IonicModule.forRoot({})),
    provideAnimations(),
    provideStore(
      [MetadataState],
      withNgxsReduxDevtoolsPlugin(),
      withNgxsLoggerPlugin()
    ),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
