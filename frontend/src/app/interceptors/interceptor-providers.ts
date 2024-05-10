import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPrefixInterceptor } from './api-prefix.interceptor';
import { WithCredentialInterceptor } from './with-credential.interceptor';

export const INTERCEPTOR_PROVIDERS = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiPrefixInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: WithCredentialInterceptor,
        multi: true,
    },
];