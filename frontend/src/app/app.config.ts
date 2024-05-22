import { HttpBackend, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TuiRootModule } from '@taiga-ui/core';

import { routes } from './app.routes';
import { INTERCEPTOR_PROVIDERS } from './interceptors/interceptor-providers';
import { FIELD_ERROR_PROVIDER } from './shared/errors';

export function HttpLoaderFactory(http: HttpBackend): TranslateLoader {
    const httpClient = new HttpClient(http);

    return new TranslateHttpLoader(httpClient, '/assets/locale/', '.json');
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideRouter(routes),
        importProvidersFrom(TuiRootModule),
        importProvidersFrom(
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpBackend],
                },
                useDefaultLang: false,
            }),
        ),
        INTERCEPTOR_PROVIDERS,
        FIELD_ERROR_PROVIDER,
        provideHttpClient(withInterceptorsFromDi()),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000',
        }),
    ],
};
