import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleNode } from '../layout/components/title/title.component';
import { statisticTitleResolver } from './resolvers/statistic-title.resolver';
import { AuthorStatisticProvider } from './services/providers/statistic-providers/author-statistic-provider.service';
import { GenreStatisticProvider } from './services/providers/statistic-providers/genre-statistic-provider.service';
import { SeriesStatisticProvider } from './services/providers/statistic-providers/series-statistic-provider.service';
import { StatisticProvider } from './services/providers/statistic-providers/statistic-provider.service';
import { TagsStatisticProvider } from './services/providers/statistic-providers/tags-statistic-provider.service';
import { YearStatisticProvider } from './services/providers/statistic-providers/year-statistic-provider.service';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: 'genres',
                loadComponent: () => import('./pages/statistic-list/statistic-list.component'),
                data: {
                    title: {
                        name: 'Жанры',
                    } as TitleNode,
                    searchEnabled: true,
                },
                providers: [
                    {
                        provide: StatisticProvider,
                        useClass: GenreStatisticProvider,
                    },
                ],
            },
            {
                path: 'genres/:statisticParam',
                resolve: {
                    title: statisticTitleResolver,
                },
                data: {
                    searchEnabled: true,
                },
                loadComponent: () => import('./pages/genre-book-list/genre-book-list.component'),
            },
            {
                path: 'tags',
                loadComponent: () => import('./pages/statistic-list/statistic-list.component'),
                data: {
                    title: {
                        name: 'Теги',
                    } as TitleNode,
                    searchEnabled: true,
                },
                providers: [
                    {
                        provide: StatisticProvider,
                        useClass: TagsStatisticProvider,
                    },
                ],
            },
            {
                path: 'tags/:statisticParam',
                resolve: {
                    title: statisticTitleResolver,
                },
                data: {
                    searchEnabled: true,
                },
                loadComponent: () => import('./pages/tag-book-list/tag-book-list.component'),
            },
            {
                path: 'authors',
                loadComponent: () => import('./pages/statistic-list/statistic-list.component'),
                data: {
                    title: {
                        name: 'Авторы',
                    } as TitleNode,
                    searchEnabled: true,
                },
                providers: [
                    {
                        provide: StatisticProvider,
                        useClass: AuthorStatisticProvider,
                    },
                ],
            },
            {
                path: 'authors/:statisticParam',
                resolve: {
                    title: statisticTitleResolver,
                },
                data: {
                    searchEnabled: true,
                },
                loadComponent: () => import('./pages/author-book-list/author-book-list.component'),
            },
            {
                path: 'years',
                loadComponent: () => import('./pages/statistic-list/statistic-list.component'),
                data: {
                    title: {
                        name: 'Года прочтения',
                    } as TitleNode,
                    searchEnabled: false,
                },
                providers: [
                    {
                        provide: StatisticProvider,
                        useClass: YearStatisticProvider,
                    },
                ],
            },
            {
                path: 'years/:statisticParam',
                resolve: {
                    title: statisticTitleResolver,
                },
                data: {
                    searchEnabled: true,
                },
                loadComponent: () => import('./pages/year-book-list/year-book-list.component'),
            },
            {
                path: 'series',
                loadComponent: () => import('./pages/statistic-list/statistic-list.component'),
                data: {
                    title: {
                        name: 'Серии',
                    } as TitleNode,
                    searchEnabled: true,
                },
                providers: [
                    {
                        provide: StatisticProvider,
                        useClass: SeriesStatisticProvider,
                    },
                ],
            },
            {
                path: 'series/:statisticParam',
                resolve: {
                    title: statisticTitleResolver,
                },
                data: {
                    searchEnabled: false,
                },
                loadComponent: () => import('./pages/series-book-list/series-book-list.component'),
            },
        ]),
    ],
})
export class StatisticModule {
}
