import { ChangeDetectionStrategy, Component } from '@angular/core';
import BookListComponent from '../../../books/pages/book-list/book-list.component';
import { BookListProvider } from '../../../shared/services/book-list-provider.service';
import { SeriesBookListProvider } from '../../services/providers/list-providers/series-book-list-provider.service';

@Component({
    selector: 'app-series-book-list',
    standalone: true,
    imports: [
        BookListComponent,
    ],
    templateUrl: './series-book-list.component.html',
    styleUrl: './series-book-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: BookListProvider,
            useClass: SeriesBookListProvider,
        },
    ],
})
export default class SeriesBookListComponent {

}
