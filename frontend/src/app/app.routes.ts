import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: 'book',
    children: [
        {
            path: 'create',
            loadComponent: () => import('./books/pages/book-form/book-form.component')
        }
    ]
}];
