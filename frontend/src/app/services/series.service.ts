import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { Book } from '../domain/book';
import { StatisticItem } from '../statistic';

@Injectable({
    providedIn: 'root',
})
export class SeriesService {
    constructor(private httpClient: HttpClient) {
    }

    public searchSeries(pattern?: string | null): Observable<StatisticItem[]> {
        const params: any = {};

        if (pattern) {
            params['pattern'] = pattern;
        }

        return this.httpClient.get<StatisticItem[]>('/series', {
            params,
        });
    }

    public getBooksForSeries(name: string): Observable<Book[]> {
        return this.httpClient.post<Book[]>(`/series/books`, {
            series: name,
        }).pipe(
            map(books => plainToInstance(Book, books)),
        );
    }
}
