import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleNode } from '../layout/components/title/title.component';
import { BookListProvider } from '../shared/services/book-list-provider.service';
import { DoneBooksListProvider } from './services/done-books-list-provider.service';
import { InProgressBooksListProvider } from './services/in-progress-books-list-provider.service';
import { ToReadBooksListProvider } from './services/to-read-books-list-provider.service';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                redirectTo: 'in-progress',
                pathMatch: 'full'
            },
            {
                path: 'create',
                loadComponent: () => import('./pages/book-form/book-form.component'),
                data: {
                    title: {
                        name: 'LAYOUT.TITLES.CREATE_BOOK',
                    } as TitleNode,
                    searchEnabled: false,
                }
            },
            {
                path: 'edit/:bookId',
                loadComponent: () => import('./pages/book-form/book-form.component'),
                data: {
                    title: {
                        name: 'LAYOUT.TITLES.EDIT_BOOK',
                    } as TitleNode,
                    searchEnabled: false,
                }
            },
            {
                path: 'in-progress',
                pathMatch: 'full',
                loadComponent: () => import('./pages/book-list/book-list.component'),
                data: {
                    title: {
                        name: 'LAYOUT.TITLES.IN_PROGRESS_LIST',
                    } as TitleNode,
                    searchEnabled: true,
                },
                providers: [
                    {
                        provide: BookListProvider,
                        useClass: InProgressBooksListProvider
                    }
                ]
            },
            {
                path: 'to-read',
                pathMatch: 'full',
                loadComponent: () => import('./pages/book-list/book-list.component'),
                data: {
                    title: {
                        name: 'LAYOUT.TITLES.TO_READ_LIST',
                    } as TitleNode,
                    searchEnabled: true,
                },
                providers: [
                    {
                        provide: BookListProvider,
                        useClass: ToReadBooksListProvider
                    }
                ]
            },
            {
                path: 'done',
                pathMatch: 'full',
                loadComponent: () => import('./pages/book-list/book-list.component'),
                data: {
                    title: {
                        name: 'LAYOUT.TITLES.DONE_LIST',
                    } as TitleNode,
                    searchEnabled: true,
                },
                providers: [
                    {
                        provide: BookListProvider,
                        useClass: DoneBooksListProvider
                    }
                ]
            },
            {
                path: ':bookId',
                loadComponent: () => import('./pages/book/book.component'),
                data: {
                    title: {
                        hidden: true,
                    } as TitleNode,
                },
            },
        ]),
    ],
})
export class BooksModule {
}
