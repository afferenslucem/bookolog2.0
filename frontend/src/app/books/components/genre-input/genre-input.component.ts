import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TuiDataListModule } from '@taiga-ui/core';
import { TuiComboBoxModule, TuiDataListWrapperModule, TuiFilterByInputPipeModule, TuiInputModule } from '@taiga-ui/kit';
import { PrefillService } from '../../../services/prefill.service';
import { FirstLetterUpPipe } from '../../../shared/pipes/first-letter-up.pipe';

@Component({
    selector: 'genre-input',
    standalone: true,
    imports: [
        TuiComboBoxModule,
        ReactiveFormsModule,
        TuiDataListWrapperModule,
        TuiFilterByInputPipeModule,
        NgForOf,
        TuiDataListModule,
        TuiInputModule,
        FirstLetterUpPipe,
        TranslateModule,
    ],
    templateUrl: './genre-input.component.html',
    styleUrl: './genre-input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenreInputComponent {
    public genres = signal<string[]>([]);

    @Input({ required: true })
    public control: FormControl<string | null> = null!;

    public constructor(private prefill: PrefillService) {
        this.prefill.getGenres().subscribe(result => this.genres.set(result));
    }
}
