import { inject } from '@angular/core';
import { Router, Routes, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { UserService } from './auth/services/user.service';
import { PageLayoutComponent } from './layout/components/page-layout/page-layout.component';
import { TitleNode } from './layout/components/title/title.component';

function AuthGuard(): Observable<boolean | UrlTree> {
    const userService = inject(UserService);
    const router = inject(Router);

    return userService.isSignedIn()
        .pipe(
            map(flag => flag),
            catchError(() => of(router.createUrlTree(['/login'])))
        );
}

export const routes: Routes = [
    {
        path: '',
        component: PageLayoutComponent,
        children: [
            {
                path: '',
                canActivateChild: [AuthGuard],
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'books',
                    },
                    {
                        path: 'books',
                        loadChildren: () => import('./books/books.module').then(m => m.BooksModule),
                    },
                    {
                        path: 'statistic',
                        loadChildren: () => import('./statistic/statistic.module').then(m => m.StatisticModule),
                    },
                ],
            },
            {
                path: 'login',
                loadComponent: () => import('./auth/pages/login-page/login-page.component'),
                data: {
                    title: {
                        hidden: true,
                    } as TitleNode,
                },
            },
            {
                path: 'logout',
                loadComponent: () => import('./auth/pages/logout-page/logout-page.component'),
            },
            {
                path: 'registration',
                loadComponent: () => import('./auth/pages/registration/registration.component'),
                data: {
                    title: {
                        hidden: true,
                    } as TitleNode,
                },
            },
            {
                path: '404',
                loadComponent: () => import('./error/pages/not-found/not-found.component'),
                data: {
                    title: {
                        hidden: true,
                    } as TitleNode,
                    searchEnabled: false,
                },
            },
            {
                path: '403',
                loadComponent: () => import('./error/pages/forbidden/forbidden.component'),
                data: {
                    title: {
                        hidden: true,
                    } as TitleNode,
                    searchEnabled: false,
                },
            },
        ],
    },

];
