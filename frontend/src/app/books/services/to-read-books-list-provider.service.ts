import { Injectable } from '@angular/core';
import { BookStatus } from '../../domain/book';
import { BookSearchOptions } from '../../domain/book-search-options';
import { BookListProvider } from '../../shared/services/book-list-provider.service';

@Injectable({
    providedIn: 'root',
})
export class ToReadBooksListProvider extends BookListProvider {
    public constructor() {
        super();
    }

    protected override getFilter(): BookSearchOptions {
        return {
            status: BookStatus.TO_READ,
            order: { fieldName: 'modifyDate', direction: 'desc' },
        };
    }
}