import { Injectable } from '@angular/core';
import { Observable, startWith, switchMap, tap } from 'rxjs';
import { SearchService } from '../../../../layout/services/search.service';
import { StatisticItem } from '../../../domain/statistic-item';
import { StatisticService } from '../../statistic.service';
import { StatisticProvider } from './statistic-provider.service';

@Injectable()
export class TagsStatisticProvider extends StatisticProvider {

    constructor(private statisticService: StatisticService, private searchService: SearchService) {
        super();
    }

    public load(): Observable<StatisticItem[]> {
        return this.searchService.search$.pipe(
            startWith(null),
            tap(() => this.loading.set(true)),
            switchMap(pattern => this.statisticService.getTagsStatistic(pattern)),
            tap(() => this.loading.set(false)),
        );
    }
}
