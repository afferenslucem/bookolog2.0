import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiDataListModule } from '@taiga-ui/core';
import { TuiFilterByInputPipeModule, TuiSelectModule } from '@taiga-ui/kit';
import { BookStatus } from '../../../domain/book';
import { BookStatusStringifyPipe } from '../../../shared';

@Component({
  selector: 'status-select',
  standalone: true,
  imports: [
    TuiSelectModule,
    TuiDataListModule,
    NgForOf,
    TuiFilterByInputPipeModule,
    BookStatusStringifyPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './status-select.component.html',
  styleUrl: './status-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusSelectComponent {
  @Input({ required: true })
  public control!: FormControl<BookStatus | null>;

  public statuses: BookStatus[] = [BookStatus.TO_READ, BookStatus.IN_PROGRESS, BookStatus.DONE];
}
