import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeriesService } from '../../../../services/series.service';
import { StatisticItem } from '../../../domain/statistic-item';
import { StatisticProvider } from './statistic-provider.service';

@Injectable()
export class SeriesStatisticProvider extends StatisticProvider {

    constructor(private seriesService: SeriesService) {
        super();
    }

    public load(): Observable<StatisticItem[]> {
        return this.seriesService.searchSeries();
    }
}
