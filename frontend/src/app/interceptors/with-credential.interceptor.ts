import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export class WithCredentialInterceptor implements HttpInterceptor{
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clone = req.clone(
            {
                withCredentials: true,
            },
        );

        return next.handle(clone);
    }
};
