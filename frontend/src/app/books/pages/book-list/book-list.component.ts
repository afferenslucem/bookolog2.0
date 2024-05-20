import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';
import { Book } from '../../../domain/book';
import { EmptyListComponent } from '../../../shared/components/empty-list-icon/empty-list.component';
import { BookListProvider } from '../../../shared/services/book-list-provider.service';
import { BookListItemComponent } from './components/book-list-item/book-list-item.component';

@Component({
    selector: 'app-book-list',
    standalone: true,
    imports: [BookListItemComponent, RouterLink, EmptyListComponent, TuiLoaderModule],
    templateUrl: './book-list.component.html',
    styleUrl: './book-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TuiDestroyService],
})
export default class BookListComponent {
    public books = signal<Book[] | null>(null);

    public constructor(public bookListProvider: BookListProvider) {
        this.bookListProvider.getBooks().subscribe(books => this.books.set(books));
    }
}
