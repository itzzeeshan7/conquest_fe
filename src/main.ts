/*
 * Entry point of the application.
 * Only platform bootstrapping code should be here.
 * For app-specific initialization, use `app/app.component.ts`.
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';

import { AppModule } from '@app/app.module';
import { environment } from '@env/environment';
import { hmrBootstrap } from './hmr';
import { register } from 'swiper/element/bundle';

// Initialize Sentry before Angular bootstrap
if (environment.sentryDsn) {
  Sentry.init({
    dsn: environment.sentryDsn,
    environment: environment.production ? 'production' : environment.staging ? 'staging' : 'development',
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    tracesSampleRate: environment.production ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

if (environment.production) {
  enableProdMode();
}

// Register Swiper web components
register();

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.hmr) {
  hmrBootstrap(module, bootstrap);
} else {
  bootstrap().catch((err) => {
    console.error(err);
    if (environment.sentryDsn) {
      Sentry.captureException(err);
    }
  });
}
