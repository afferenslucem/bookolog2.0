import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TuiDestroyService, TuiLetModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiDialogService, TuiLoaderModule } from '@taiga-ui/core';
import { tuiIconDraft } from '@taiga-ui/icons';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { filter, map, Observable, switchMap, takeUntil } from 'rxjs';
import { Book, BookStatus } from '../../../domain/book';
import { BookService } from '../../../services/book.service';
import {
    BookDateFormatPipe,
    BookStatusStringifyPipe,
    BookTypeStringifyPipe,
    JoinPipe,
    ViewContainer,
} from '../../../shared';
import {
    ConfirmationDialogComponent,
    ConfirmationDialogContext,
} from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'app-book',
    standalone: true,
    imports: [
        TuiLoaderModule,
        TuiLetModule,
        JoinPipe,
        BookDateFormatPipe,
        TuiButtonModule,
        RouterLink,
        BookStatusStringifyPipe,
        BookTypeStringifyPipe,
        TranslateModule,
    ],
    templateUrl: './book.component.html',
    styleUrl: './book.component.scss',
    providers: [TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [ViewContainer]
})
export default class BookComponent {
    public book = signal<Book | nil>(null);

    public BookStatus = BookStatus;

    public editIcon = tuiIconDraft;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private destroy$: TuiDestroyService,
        private bookService: BookService,
        private dialog$: TuiDialogService,
        private router: Router
    ) {
        activatedRoute.params.pipe(
            map(params => params['bookId']),
            map(bookId => Number(bookId)),
            switchMap(id => this.bookService.loadBook(id)),
            takeUntil(destroy$),
        ).subscribe(book => this.book.set(book));
    }

    public delete(): void {
        this.showDeleteDialog()
            .pipe(
                filter(Boolean),
                switchMap(() => this.bookService.deleteBook(this.book()!.id)),
                takeUntil(this.destroy$))
            .subscribe(() => {
                switch (this.book()!.status) {
                    case BookStatus.IN_PROGRESS: {
                        this.router.navigate(['/books/in-progress']);
                        return;
                    }
                    case BookStatus.DONE: {
                        this.router.navigate(['/books/done']);
                        return;
                    }
                    case BookStatus.TO_READ: {
                        this.router.navigate(['/books/to-read']);
                        return;
                    }
                }
            });
    }

    private showDeleteDialog(): Observable<boolean> {
        return this.dialog$.open(new PolymorpheusComponent(ConfirmationDialogComponent), {
            data: {
                header: 'BOOK_DELETE_DIALOG.HEADER',
                description: 'BOOK_DELETE_DIALOG.DESCRIPTION',
            } as ConfirmationDialogContext,
        });
    }
}
