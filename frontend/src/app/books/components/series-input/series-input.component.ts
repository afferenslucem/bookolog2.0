import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiDataListModule } from '@taiga-ui/core';
import { TuiComboBoxModule, TuiDataListWrapperModule, TuiFilterByInputPipeModule, TuiInputModule } from '@taiga-ui/kit';
import { PrefillService } from '../../../services/prefill.service';
import { FirstLetterUpPipe } from '../../../shared/pipes/first-letter-up.pipe';

@Component({
    selector: 'series-input',
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
    ],
    templateUrl: './series-input.component.html',
    styleUrl: './series-input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesInputComponent {
    public series = signal<string[]>([]);

    @Input({ required: true })
    public control: FormControl<string | null> = null!;

    public constructor(private prefill: PrefillService) {
        this.prefill.getSeries().subscribe(result => this.series.set(result));
    }
}
