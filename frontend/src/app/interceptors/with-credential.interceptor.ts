import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

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
