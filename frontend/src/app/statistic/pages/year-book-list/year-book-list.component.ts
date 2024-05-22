import { ChangeDetectionStrategy, Component } from '@angular/core';
import BookListComponent from '../../../books/pages/book-list/book-list.component';
import { BookListProvider } from '../../../shared/services/book-list-provider.service';
import { YearBookListProvider } from '../../services/providers/list-providers/year-book-list-provider.service';

@Component({
    selector: 'app-year-book-list',
    standalone: true,
    imports: [
        BookListComponent,
    ],
    templateUrl: './year-book-list.component.html',
    styleUrl: './year-book-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: BookListProvider,
            useClass: YearBookListProvider,
        },
    ],
})
export default class YearBookListComponent {

}
