import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
    @Output() routeChanges = new EventEmitter();

    public groupedLinks = [
        [
            {
                title: 'Добавить',
                url: '/books/create',
            },
            {
                title: 'Читаю',
                url: '/books/in-progress',
            },
            {
                title: 'К прочтению',
                url: '/books/to-read',
            },
            {
                title: 'Прочитано',
                url: '/books/done',
            },
        ],
        [
            {
                title: 'Серии',
                url: '/statistic/series',
            },
            {
                title: 'Авторы',
                url: '/statistic/authors',
            },
            {
                title: 'Теги',
                url: '/statistic/tags',
            },
            {
                title: 'Жанры',
                url: '/statistic/genres',
            },
            {
                title: 'Года прочтения',
                url: '/statistic/years',
            },
        ],
    ];
}
