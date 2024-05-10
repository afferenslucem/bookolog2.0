import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatisticItem } from '../../../domain/statistic-item';
import { StatisticProvider } from './statistic-provider.service';
import { StatisticService } from '../../statistic.service';

@Injectable()
export class AuthorStatisticProvider extends StatisticProvider {

    constructor(private statisticService: StatisticService) {
        super();
    }

    public load(): Observable<StatisticItem[]> {
        return this.statisticService.getAuthorsStatistic();
    }
}
