import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { StatisticItem } from '../../../domain/statistic-item';
import { StatisticService } from '../../statistic.service';
import { StatisticProvider } from './statistic-provider.service';

@Injectable()
export class YearStatisticProvider extends StatisticProvider {

    constructor(private statisticService: StatisticService) {
        super();
    }

    public load(): Observable<StatisticItem[]> {
        this.loading.set(true);
        return this.statisticService.getYearsStatistic().pipe(
            tap(() => this.loading.set(false)),
        );
    }
}
