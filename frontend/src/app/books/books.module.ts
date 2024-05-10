import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookStatus } from '../domain/book';
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
                        name: 'Создание книги'
                    } as TitleNode,
                }
            },
            {
                path: 'edit/:bookId',
                loadComponent: () => import('./pages/book-form/book-form.component'),
                data: {
                    title: {
                        name: 'Редактирование книги'
                    } as TitleNode,
                }
            },
            {
                path: 'in-progress',
                pathMatch: 'full',
                loadComponent: () => import('./pages/book-list/book-list.component'),
                data: {
                    title: {
                        name: 'Читаю',
                    } as TitleNode,
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
                        name: 'К прочтению',
                    } as TitleNode,
                    status: BookStatus.TO_READ,
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
                        name: 'Прочитано',
                    } as TitleNode,
                    status: BookStatus.DONE,
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
