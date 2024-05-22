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
                title: 'LAYOUT.SIDEBAR.ADD_BOOK',
                url: '/books/create',
            },
            {
                title: 'LAYOUT.SIDEBAR.IN_PROGRESS_LIST',
                url: '/books/in-progress',
            },
            {
                title: 'LAYOUT.SIDEBAR.TO_READ_LIST',
                url: '/books/to-read',
            },
            {
                title: 'LAYOUT.SIDEBAR.DONE_LIST',
                url: '/books/done',
            },
        ],
        [
            {
                title: 'LAYOUT.SIDEBAR.SERIES_LIST',
                url: '/statistic/series',
            },
            {
                title: 'LAYOUT.SIDEBAR.AUTHORS_LIST',
                url: '/statistic/authors',
            },
            {
                title: 'LAYOUT.SIDEBAR.TAGS_LIST',
                url: '/statistic/tags',
            },
            {
                title: 'LAYOUT.SIDEBAR.GENRES_LIST',
                url: '/statistic/genres',
            },
            {
                title: 'LAYOUT.SIDEBAR.YEARS_LIST',
                url: '/statistic/years',
            },
        ],
    ];
}
