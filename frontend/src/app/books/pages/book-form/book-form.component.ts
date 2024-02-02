import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputDateModule, TuiInputModule, TuiTextareaModule } from '@taiga-ui/kit';
import { ReadDate } from '../../../domain/book';
import { PagePadding } from '../../../shared/directives/page-padding.directive';
import { FormLayoutModule } from '../../../shared/form-layout/form-layout.module';
import { AuthorsInputComponent } from '../../components/authors-input/authors-input.component';
import { TagsInputComponent } from '../../components/tags-input/tags-input.component';

interface BookForm {
    name: FormControl<string>;
    description: FormControl<string | nil>;
    authors: FormArray<FormControl<string>>;
    tags: FormArray<FormControl<string>>;
    startDate: FormControl<ReadDate | nil>;
    finishDate: FormControl<ReadDate | nil>;
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
    ],
    hostDirectives: [PagePadding],
    templateUrl: './book-form.component.html',
    styleUrl: './book-form.component.scss',
})
export default class BookFormComponent {
    public form: FormGroup<BookForm>;

    public constructor() {
        this.form = this.createFormGroup();
    }

    private createFormGroup(): FormGroup<BookForm> {
        return new FormGroup<BookForm>({
            name: new FormControl('', { nonNullable: true, updateOn: 'blur' }),
            description: new FormControl('', { updateOn: 'blur' }),
            authors: new FormArray([new FormControl('', { nonNullable: true, updateOn: 'blur' })]),
            tags: new FormArray([new FormControl('', { nonNullable: true, updateOn: 'blur' })]),
            startDate: new FormControl<ReadDate | nil>(null, { updateOn: 'blur' }),
            finishDate: new FormControl<ReadDate | nil>(null, { updateOn: 'blur' }),
        });
    }
}
