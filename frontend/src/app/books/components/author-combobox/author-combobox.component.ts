import { NgForOf, TitleCasePipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TuiDataListModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiFilterByInputPipeModule, TuiInputModule, TuiTextareaModule } from '@taiga-ui/kit';
import { PrefillService } from '../../../services/prefill.service';

@Component({
    selector: 'author-combobox',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
        TuiDataListModule,
        NgForOf,
        TuiInputModule,
        TuiFilterByInputPipeModule,
        TitleCasePipe,
        TranslateModule,
        TuiTextareaModule,
    ],
    templateUrl: './author-combobox.component.html',
    styleUrl: './author-combobox.component.scss',
})
export class AuthorComboboxComponent {
    @Input({ required: true })
    public control!: FormControl<string>;

    public authors = signal<string[]>([]);

    public constructor(private prefill: PrefillService) {
        this.prefill.getAuthors().subscribe(result => this.authors.set(result));
    }
}
