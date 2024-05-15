import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { BookService } from '../../../../books';
import { Book } from '../../../../domain/book';
import { BookListProvider } from '../../../../shared/services/book-list-provider.service';

@Injectable()
export class SeriesBookListProvider extends BookListProvider {

    constructor(private route: ActivatedRoute, private bookService: BookService) {
        super();
    }

    public override getBooks(): Observable<Book[]> {
        return this.route.paramMap.pipe(
            map(params => params.get('statisticParam')),
            switchMap(param => this.bookService.searchBooks({
                series: param!,
                order: { fieldName: 'seriesNumber', direction: 'asc' },
            })),
        );
    }
}
