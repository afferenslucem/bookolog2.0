import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatisticItem } from '../../../domain/statistic-item';

export abstract class StatisticProvider {

  constructor() { }

  public abstract load(): Observable<StatisticItem[]>;
}
