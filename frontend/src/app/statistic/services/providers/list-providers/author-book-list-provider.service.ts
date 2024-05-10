import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { BookService } from '../../../../books';
import { Book, BookStatus } from '../../../../domain/book';
import { BookListProvider } from '../../../../shared/services/book-list-provider.service';

@Injectable()
export class AuthorBookListProvider extends BookListProvider {

    constructor(private route: ActivatedRoute, private bookService: BookService) {
        super();
    }

    public override getBooks(): Observable<Book[]> {
        return this.route.paramMap.pipe(
            map(params => params.get('statisticParam')),
            switchMap(param => this.bookService.searchBooks({ author: param!, status: BookStatus.DONE })),
        )
    }
}
