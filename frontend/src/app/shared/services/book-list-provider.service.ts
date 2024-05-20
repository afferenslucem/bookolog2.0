import { inject, signal } from '@angular/core';
import { debounceTime, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { Book } from '../../domain/book';
import { BookSearchOptions } from '../../domain/book-search-options';
import { SearchService } from '../../layout/services/search.service';
import { BookService } from '../../services/book.service';

export abstract class BookListProvider {
    private bookService: BookService;
    private searchService: SearchService;

    public loading = signal(false);

    constructor() {
        this.bookService = inject(BookService);
        this.searchService = inject(SearchService);
    }

    public getBooks(): Observable<Book[]> {
        return this.searchService.search$.pipe(
            startWith(null),
            debounceTime(300),
            map(pattern => ({
                ...this.getFilter(),
                pattern,
            })),
            tap(() => this.loading.set(true)),
            switchMap(filter => this.bookService.searchBooks(filter as BookSearchOptions)),
            tap(() => this.loading.set(false)),
        );
    }

    protected abstract getFilter(): BookSearchOptions;
}
