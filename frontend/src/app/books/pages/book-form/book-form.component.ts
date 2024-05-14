import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiDay, TuiDestroyService } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiLoaderModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import {
    TuiComboBoxModule,
    TuiInputDateModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiTextareaModule,
    TuiToggleModule,
} from '@taiga-ui/kit';
import { filter, first, map, takeUntil, tap } from 'rxjs';
import { Book, BookStatus, BookType, ReadDate } from '../../../domain/book';
import { BookService } from '../../../services/book.service';
import { PagePadding, ViewContainer } from '../../../shared';
import { FormLayoutModule } from '../../../shared/form-layout/form-layout.module';
import { AuthorsInputComponent } from '../../components/authors-input/authors-input.component';
import { GenreInputComponent } from '../../components/genre-input/genre-input.component';
import { SeriesInputComponent } from '../../components/series-input/series-input.component';
import { StatusSelectComponent } from '../../components/status-select/status-select.component';
import { TagsInputComponent } from '../../components/tags-input/tags-input.component';
import { TypeSelectComponent } from '../../components/type-select/type-select.component';

interface BookForm {
    id: FormControl<number | null>;
    name: FormControl<string>;
    note: FormControl<string | null>;
    authors: FormArray<FormControl<string>>;
    genre: FormControl<string | null>;
    tags: FormArray<FormControl<string>>;
    status: FormControl<BookStatus | null>;
    series: FormControl<string | null>;
    seriesNumber: FormControl<number | null>;
    seriesEnabled: FormControl<boolean>;
    type: FormControl<BookType | null>;
    startDate: FormControl<ReadDate | null>;
    finishDate: FormControl<ReadDate | null>;
}

@Component({
    selector: 'book-form-layout',
    standalone: true,
    imports: [
        TuiInputModule,
        ReactiveFormsModule,
        FormLayoutModule,
        TuiTextfieldControllerModule,
        AuthorsInputComponent,
        TuiTextareaModule,
        TagsInputComponent,
        TuiInputDateModule,
        TuiButtonModule,
        TuiComboBoxModule,
        GenreInputComponent,
        StatusSelectComponent,
        TypeSelectComponent,
        TuiLoaderModule,
        TuiInputNumberModule,
        TuiToggleModule,
        SeriesInputComponent,
    ],
    providers: [TuiDestroyService],
    hostDirectives: [PagePadding, ViewContainer],
    templateUrl: './book-form.component.html',
    styleUrl: './book-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BookFormComponent {
    public form: FormGroup<BookForm>;
    public BookStatus = BookStatus;

    public id = signal<number | null>(null);
    public book = signal<Book | null>(null);

    public get statusValue(): BookStatus | null {
        return this.form.controls.status.value;
    }

    public get seriesEnabledValue(): boolean {
        return this.form.controls.seriesEnabled.value;
    }

    public constructor(private activatedRoute: ActivatedRoute, private bookClient: BookService, private router: Router, private destroy$: TuiDestroyService) {
        this.form = this.createFormGroup();

        this.form.controls.status.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(status => this.onStatusChange(status));

        this.activatedRoute.params.pipe(
            first(),
            map(params => params['bookId']),
            filter(id => id != null),
            map(id => Number(id)),
            tap(id => this.id.set(id)),
        ).subscribe(id => this.tryLoadBook(id));
    }

    public save() {
        this.bookClient.saveBook(Object.assign(new Book(), this.form.getRawValue())).subscribe(book => {
            switch (book.status) {
                case BookStatus.IN_PROGRESS: {
                    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
                    return;
                }
                case BookStatus.DONE: {
                    this.router.navigate(['../../done'], { relativeTo: this.activatedRoute });
                    return;
                }
                case BookStatus.TO_READ: {
                    this.router.navigate(['../../to-read'], { relativeTo: this.activatedRoute });
                    return;
                }
            }

        });
    }

    private onStatusChange(status: BookStatus | null) {
        switch (status) {
            case BookStatus.IN_PROGRESS: {
                this.form.controls.startDate.setValue(TuiDay.fromLocalNativeDate(new Date()));
                return;
            }
            case BookStatus.DONE: {
                this.form.controls.finishDate.setValue(TuiDay.fromLocalNativeDate(new Date()));
            }
        }
    }

    private createFormGroup(): FormGroup<BookForm> {
        return new FormGroup<BookForm>({
            id: new FormControl(null),
            name: new FormControl('', { nonNullable: true, updateOn: 'blur', validators: Validators.required }),
            note: new FormControl('', { updateOn: 'blur' }),
            authors: new FormArray([new FormControl('', { nonNullable: true })]),
            tags: new FormArray([new FormControl('', { nonNullable: true })]),
            genre: new FormControl(null, { updateOn: 'blur', validators: Validators.required }),
            status: new FormControl<BookStatus | null>(null, { validators: Validators.required }),
            series: new FormControl<string | null>(null, { updateOn: 'blur' }),
            seriesNumber: new FormControl<number | null>(null, { updateOn: 'blur' }),
            seriesEnabled: new FormControl<boolean>(false, { nonNullable: true }),
            type: new FormControl<BookType | null>(null, { validators: Validators.required }),
            startDate: new FormControl<ReadDate | null>(null, { updateOn: 'blur' }),
            finishDate: new FormControl<ReadDate | null>(null, { updateOn: 'blur' }),
        });
    }

    private tryLoadBook(id: number): void {
        this.bookClient.loadBook(id).subscribe(book => {
            this.resizeArrayFor(this.form.controls.tags, book.tags.length - 1);
            this.resizeArrayFor(this.form.controls.authors, book.authors.length - 1);

            this.form.patchValue(book);

            this.form.patchValue({
                seriesEnabled: !!book.series,
            });

            this.book.set(book);
        });
    }

    private resizeArrayFor(array: FormArray, length: number) {
        for (let i = 0; i < length; i++) {
            array.push(new FormControl('', { nonNullable: true }), { emitEvent: false });
        }
    }
}
