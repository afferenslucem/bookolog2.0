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
export class PrefillService {
    constructor(private httpClient: HttpClient) {
    }

    public getAuthors(): Observable<string[]> {
        return this.httpClient.get<string[]>(`/prefill/authors`);
    }

    public getTags(): Observable<string[]> {
        return this.httpClient.get<string[]>(`/prefill/tags`);
    }

    public getGenres(): Observable<string[]> {
        return this.httpClient.get<string[]>(`/prefill/genres`);
    }

    public getSeries(): Observable<string[]> {
        return this.httpClient.get<string[]>(`/prefill/series`);
    }
}
