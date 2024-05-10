import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StatisticItem } from '../domain/statistic-item';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  constructor(private httpClient: HttpClient) { }

  public getGenresStatistic(): Observable<StatisticItem[]> {
    return this.httpClient.get<StatisticItem[]>('/statistic/genres')
  }

  public getGenres(): Observable<string[]> {
    return this.getGenresStatistic().pipe(
        map(genres => genres.map(item => item.name))
    )
  }

  public getAuthorsStatistic(): Observable<StatisticItem[]> {
    return this.httpClient.get<StatisticItem[]>('/statistic/authors')
  }

  public getYearsStatistic(): Observable<StatisticItem[]> {
    return this.httpClient.get<StatisticItem[]>('/statistic/years')
  }

  public getAuthors(): Observable<string[]> {
    return this.getAuthorsStatistic().pipe(
        map(genres => genres.map(item => item.name))
    )
  }

  public getTagsStatistic(): Observable<StatisticItem[]> {
    return this.httpClient.get<StatisticItem[]>('/statistic/tags')
  }

  public getTags(): Observable<string[]> {
    return this.getTagsStatistic().pipe(
        map(genres => genres.map(item => item.name))
    )
  }
}
