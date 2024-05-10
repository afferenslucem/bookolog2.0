import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { TuiRootModule } from '@taiga-ui/core';

import { routes } from './app.routes';
import { INTERCEPTOR_PROVIDERS } from './interceptors/interceptor-providers';
import { FIELD_ERROR_PROVIDER } from './shared/errors';

export const appConfig: ApplicationConfig = {
    providers: [provideAnimations(), provideRouter(routes), importProvidersFrom(TuiRootModule), INTERCEPTOR_PROVIDERS, FIELD_ERROR_PROVIDER, provideHttpClient(withInterceptorsFromDi())],
};
