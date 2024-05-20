import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookStatus } from '../../../../domain/book';
import { BookSearchOptions } from '../../../../domain/book-search-options';
import { BookListProvider } from '../../../../shared/services/book-list-provider.service';

@Injectable()
export class GenreBookListProvider extends BookListProvider {

    constructor(private route: ActivatedRoute) {
        super();
    }

    protected override getFilter(): BookSearchOptions {
        return { genre: this.route.snapshot.params['statisticParam'], status: BookStatus.DONE };
    }
}
