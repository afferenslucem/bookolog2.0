import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';
import { PagePadding } from '../../../shared/directives/page-padding.directive';

interface BookForm {
    name: FormControl<string>;
    description: FormControl<string | nil>;
    authors: FormControl<string[]>;
    tags: FormControl<string[]>;
}

@Component({
    selector: 'book-form',
    standalone: true,
    imports: [
        TuiInputModule,
        ReactiveFormsModule,
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
            name: new FormControl<string>('', { nonNullable: true }),
            description: new FormControl<string>(''),
            authors: new FormControl<string[]>([], { nonNullable: true }),
            tags: new FormControl<string[]>([], { nonNullable: true }),
        });
    }
}
