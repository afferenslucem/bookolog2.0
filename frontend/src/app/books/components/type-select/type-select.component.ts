import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TuiDataListModule } from '@taiga-ui/core';
import { TuiFilterByInputPipeModule, TuiSelectModule } from '@taiga-ui/kit';
import { BookType } from '../../../domain/book';
import { BookTypeStringifyPipe } from '../../../shared';

@Component({
    selector: 'type-select',
    standalone: true,
    imports: [
        TuiSelectModule,
        TuiDataListModule,
        NgForOf,
        TuiFilterByInputPipeModule,
        ReactiveFormsModule,
        BookTypeStringifyPipe,
        TranslateModule,
    ],
    templateUrl: './type-select.component.html',
    styleUrl: './type-select.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeSelectComponent {
    @Input({ required: true })
    public control!: FormControl<BookType | null>;

    public types: BookType[] = [BookType.AUDIO, BookType.PAPER, BookType.ELECTRONIC];
}
