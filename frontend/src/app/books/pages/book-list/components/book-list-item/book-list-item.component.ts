import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Book } from '../../../../../domain/book';
import { BookDateFormatPipe } from '../../../../../shared/pipes/book-date-format.pipe';
import { JoinPipe } from '../../../../../shared/pipes/join.pipe';

@Component({
    selector: 'app-book-list-item',
    standalone: true,
    imports: [BookDateFormatPipe, JoinPipe, TranslateModule],
    templateUrl: './book-list-item.component.html',
    styleUrl: './book-list-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListItemComponent {
    @Input({ required: true })
    public book: Book = null!;
}
