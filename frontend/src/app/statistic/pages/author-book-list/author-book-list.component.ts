import { ChangeDetectionStrategy, Component } from '@angular/core';
import BookListComponent from '../../../books/pages/book-list/book-list.component';
import { BookListProvider } from '../../../shared/services/book-list-provider.service';
import { AuthorBookListProvider } from '../../services/providers/list-providers/author-book-list-provider.service';

@Component({
    selector: 'app-year-book-list',
    standalone: true,
    imports: [
        BookListComponent,
    ],
    templateUrl: './author-book-list.component.html',
    styleUrl: './author-book-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: BookListProvider,
            useClass: AuthorBookListProvider,
        },
    ],
})
export default class AuthorBookListComponent {

}
