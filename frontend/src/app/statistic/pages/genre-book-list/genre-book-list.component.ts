import { ChangeDetectionStrategy, Component } from '@angular/core';
import BookListComponent from '../../../books/pages/book-list/book-list.component';
import { BookListProvider } from '../../../shared/services/book-list-provider.service';
import { GenreBookListProvider } from '../../services/providers/list-providers/genre-book-list-provider.service';

@Component({
    selector: 'app-series-book-list',
    standalone: true,
    imports: [
        BookListComponent,
    ],
    templateUrl: './genre-book-list.component.html',
    styleUrl: './genre-book-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: BookListProvider,
            useClass: GenreBookListProvider,
        },
    ],
})
export default class GenreBookListComponent {

}
