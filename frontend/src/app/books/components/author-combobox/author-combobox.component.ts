import { AsyncPipe, NgForOf } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiDataListModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiComboBoxModule, TuiDataListWrapperModule, TuiFilterByInputPipeModule, TuiInputModule } from '@taiga-ui/kit';
import { BehaviorSubject, combineLatest, delay, map, Observable, of, Subject } from 'rxjs';
import { StatisticService } from '../../../statistic/services/statistic.service';

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
  ],
  templateUrl: './author-combobox.component.html',
  styleUrl: './author-combobox.component.scss'
})
export class AuthorComboboxComponent {
  @Input({ required: true })
  public control!: FormControl<string>;

  public authors = signal<string[]>([]);

  public constructor(private statistic: StatisticService) {
    this.statistic.getAuthors().subscribe(result => this.authors.set(result));
  }
}
