import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable()
export class NotFoundInterceptor implements HttpInterceptor {
    public constructor(private router: Router) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => this.handleNotFoundError(error)),
        );
    }

    private handleNotFoundError(error: HttpErrorResponse): Observable<any> {
        if (error.status === 404) {
            this.router.navigateByUrl(`/404`);
            return of(error.message);
        }
        return throwError(() => error);
    }
};
