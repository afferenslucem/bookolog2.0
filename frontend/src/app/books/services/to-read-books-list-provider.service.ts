import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BookStatus } from '../../domain/book';
import { BookService } from '../../services/book.service';
import { BookListProvider } from '../../shared/services/book-list-provider.service';

@Injectable({
    providedIn: 'root',
})
export class ToReadBooksListProvider extends BookListProvider {

    public constructor(private bookService: BookService) {
        super();
    }

    public override getBooks(): Observable<Book[]> {
        return this.bookService.searchBooks({
            status: BookStatus.TO_READ,
            order: { fieldName: 'modifyDate', direction: 'desc' },
        });
    }
}