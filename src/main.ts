import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { appRouterProviders } from './app/app.routes';

import { AppComponent, environment } from './app/';
import { APP_SHELL_RUNTIME_PROVIDERS } from '@angular/app-shell';
import { HackerNewsAPIService } from './app/services/hackernews-api.service';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [HackerNewsAPIService, APP_SHELL_RUNTIME_PROVIDERS, HTTP_PROVIDERS, appRouterProviders]);
