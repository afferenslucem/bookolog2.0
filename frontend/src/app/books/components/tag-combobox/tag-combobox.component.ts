import { NgForOf } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TuiDataListModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiFilterByInputPipeModule, TuiInputModule } from '@taiga-ui/kit';
import { PrefillService } from '../../../services/prefill.service';
import { FirstLetterUpPipe } from '../../../shared/pipes/first-letter-up.pipe';

@Component({
    selector: 'tag-combobox',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
        NgForOf,
        TuiDataListModule,
        TuiFilterByInputPipeModule,
        TuiInputModule,
        FirstLetterUpPipe,
        TranslateModule,
    ],
    templateUrl: './tag-combobox.component.html',
    styleUrl: './tag-combobox.component.scss',
})
export class TagComboboxComponent {
    @Input({ required: true })
    public control!: FormControl<string>;

    public tags = signal<string[]>([]);

    public constructor(private prefill: PrefillService) {
        this.prefill.getTags().subscribe(result => this.tags.set(result));
    }
}
