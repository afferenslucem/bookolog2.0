import { ChangeDetectionStrategy, Component } from '@angular/core';
import BookListComponent from '../../../books/pages/book-list/book-list.component';
import { BookListProvider } from '../../../shared/services/book-list-provider.service';
import { TagBookListProvider } from '../../services/providers/list-providers/tag-book-list-provider.service';

@Component({
    selector: 'app-year-book-list',
    standalone: true,
    imports: [
        BookListComponent,
    ],
    templateUrl: './tag-book-list.component.html',
    styleUrl: './tag-book-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: BookListProvider,
            useClass: TagBookListProvider,
        },
    ],
})
export default class TagBookListComponent {

}
