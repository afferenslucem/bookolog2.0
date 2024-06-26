import { Directive, Input, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { takeUntil } from 'rxjs';

@Directive()
export abstract class ArrayInputComponent implements OnInit {
    @Input({ required: true })
    public controlArray!: FormArray<FormControl<string>>;

    protected constructor(private destroy$: TuiDestroyService) {
    }

    public ngOnInit(): void {
        this.controlArray.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(values => this.checkDeleted());
    }

    public addControl(): void {
        this.controlArray.push(new FormControl('', { nonNullable: true, updateOn: 'blur' }), { emitEvent: false });
    }

    private checkDeleted(): void {
        const values = this.controlArray.value;
        const emptyIndex = values.findIndex(item => this.isEmpty(item));

        if (emptyIndex === -1 || values.length === 1) {
            return;
        }

        this.controlArray.removeAt(emptyIndex, { emitEvent: false });
    }

    protected abstract isEmpty(value: string): boolean;
}