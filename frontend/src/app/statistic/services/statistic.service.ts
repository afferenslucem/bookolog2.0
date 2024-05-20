import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { AuthorStatisticItem, StatisticItem } from '../domain/statistic-item';

@Injectable({
    providedIn: 'root',
})
export class StatisticService {
    constructor(private httpClient: HttpClient) {
    }

    public getGenresStatistic(pattern?: string | null): Observable<StatisticItem[]> {
        const params: any = {};

        if (pattern) {
            params['pattern'] = pattern;
        }

        return this.httpClient.get<StatisticItem[]>(`/statistic/genres`, {
            params,
        }).pipe(
            map(result => plainToInstance(StatisticItem, result)),
        );
    }

    public getAuthorsStatistic(pattern?: string | null): Observable<StatisticItem[]> {
        const params: any = {};

        if (pattern) {
            params['pattern'] = pattern;
        }

        return this.httpClient.get<StatisticItem[]>('/statistic/authors', {
            params,
        }).pipe(
            map(result => plainToInstance(AuthorStatisticItem, result)),
        );
    }

    public getYearsStatistic(): Observable<StatisticItem[]> {
        return this.httpClient.get<StatisticItem[]>('/statistic/years').pipe(
            map(result => plainToInstance(StatisticItem, result)),
        );
    }

    public getTagsStatistic(pattern?: string | null): Observable<StatisticItem[]> {
        const params: any = {};

        if (pattern) {
            params['pattern'] = pattern;
        }

        return this.httpClient.get<StatisticItem[]>('/statistic/tags', {
            params,
        }).pipe(
            map(result => plainToInstance(StatisticItem, result)),
        );
    }
}
