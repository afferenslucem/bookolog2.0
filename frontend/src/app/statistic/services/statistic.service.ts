import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { AuthorStatisticItem, StatisticItem } from '../domain/statistic-item';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  constructor(private httpClient: HttpClient) { }

  public getGenresStatistic(): Observable<StatisticItem[]> {
    return this.httpClient.get<StatisticItem[]>('/statistic/genres').pipe(
        map(result => plainToInstance(StatisticItem, result))
    )
  }

  public getGenres(): Observable<string[]> {
    return this.getGenresStatistic().pipe(
        map(genres => genres.map(item => item.name))
    )
  }

  public getAuthorsStatistic(): Observable<StatisticItem[]> {
    return this.httpClient.get<StatisticItem[]>('/statistic/authors').pipe(
        map(result => plainToInstance(AuthorStatisticItem, result))
    )
  }

  public getYearsStatistic(): Observable<StatisticItem[]> {
    return this.httpClient.get<StatisticItem[]>('/statistic/years').pipe(
        map(result => plainToInstance(StatisticItem, result))
    )
  }

  public getAuthors(): Observable<string[]> {
    return this.getAuthorsStatistic().pipe(
        map(genres => genres.map(item => item.name))
    )
  }

  public getTagsStatistic(): Observable<StatisticItem[]> {
    return this.httpClient.get<StatisticItem[]>('/statistic/tags').pipe(
        map(result => plainToInstance(StatisticItem, result))
    )
  }

  public getTags(): Observable<string[]> {
    return this.getTagsStatistic().pipe(
        map(genres => genres.map(item => item.name))
    )
  }
}
