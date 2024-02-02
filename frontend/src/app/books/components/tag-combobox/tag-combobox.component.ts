import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiComboBoxModule, TuiDataListWrapperModule } from '@taiga-ui/kit';
import { BehaviorSubject, combineLatest, delay, map, Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'tag-combobox',
  standalone: true,
  imports: [
    TuiComboBoxModule,
    ReactiveFormsModule,
    TuiDataListWrapperModule,
    AsyncPipe,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './tag-combobox.component.html',
  styleUrl: './tag-combobox.component.scss'
})
export class TagComboboxComponent {
  @Input({ required: true })
  public control!: FormControl<string>;

  public search$ = new BehaviorSubject<string | nil>('');

  public tags$: Observable<string[]>;

  private remoteTags$: Observable<string[]> = of(['Классика', 'Фантастика', 'Драконы']).pipe(delay(500))

  public constructor() {
    this.tags$ = combineLatest([this.remoteTags$, this.search$]).pipe(
        map(([authors, filter]) => authors.filter(item => item.includes(filter ?? '')))
    )
  }

  public onSearchChange(line: string | nil): void {
    this.search$.next(line);
  }

  public extractValueFromEvent(event: Event): string | nil {
    return (event.target as HTMLInputElement)?.value || null;
  }

  public setValue(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value ?? '';
    this.control.setValue(value);
  }
}
