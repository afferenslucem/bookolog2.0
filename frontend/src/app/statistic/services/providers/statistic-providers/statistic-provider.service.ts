import { signal } from '@angular/core';
import { Observable } from 'rxjs';
import { StatisticItem } from '../../../domain/statistic-item';

export abstract class StatisticProvider {
  public loading = signal(false);

  public abstract load(): Observable<StatisticItem[]>;
}
