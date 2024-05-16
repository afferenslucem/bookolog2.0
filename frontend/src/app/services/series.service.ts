import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { classToPlain, instanceToPlain, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { Book, BookStatus } from '../domain/book';
import { BookSearchOptions } from '../domain/book-search-options';
import { StatisticItem } from '../statistic';

@Injectable({
    providedIn: 'root',
})
export class SeriesService {
    constructor(private httpClient: HttpClient) {
    }

    public searchSeries(): Observable<StatisticItem[]> {
        return this.httpClient.get<StatisticItem[]>('/series');
    }

    public getBooksForSeries(name: string): Observable<Book[]> {
        return this.httpClient.post<Book[]>(`/series/books`, {
            series: name
        }).pipe(
            map(books => plainToInstance(Book, books))
        );
    }
}
