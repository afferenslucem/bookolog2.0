import { Injectable } from '@angular/core';
import { Observable, startWith, switchMap, tap } from 'rxjs';
import { SearchService } from '../../../../layout/services/search.service';
import { SeriesService } from '../../../../services/series.service';
import { StatisticItem } from '../../../domain/statistic-item';
import { StatisticProvider } from './statistic-provider.service';

@Injectable()
export class SeriesStatisticProvider extends StatisticProvider {

    constructor(private seriesService: SeriesService, private searchService: SearchService) {
        super();
    }

    public load(): Observable<StatisticItem[]> {
        return this.searchService.search$.pipe(
            startWith(null),
            tap(() => this.loading.set(true)),
            switchMap(pattern => this.seriesService.searchSeries(pattern)),
            tap(() => this.loading.set(false)),
        );
    }
}
