import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { Book } from '../../../../domain/book';
import { BookSearchOptions } from '../../../../domain/book-search-options';
import { SeriesService } from '../../../../services/series.service';
import { BookListProvider } from '../../../../shared/services/book-list-provider.service';

@Injectable()
export class SeriesBookListProvider extends BookListProvider {
    constructor(private route: ActivatedRoute, private seriesService: SeriesService) {
        super();
    }

    public override getBooks(): Observable<Book[]> {
        return this.route.paramMap.pipe(
            map(params => params.get('statisticParam')),
            switchMap(param => this.seriesService.getBooksForSeries(param!)),
        );
    }

    protected override getFilter(): BookSearchOptions {
        return undefined!;
    }
}
