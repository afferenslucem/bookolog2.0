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
            .subscribe(values => this.manageControls());
    }

    private manageControls(): void {
        this.checkLastFilled();

        this.checkDeleted();
    }

    private checkLastFilled(): void {
        const values = this.controlArray.value;
        const last = values[values.length - 1];

        if (!this.isEmpty(last)) {
            this.controlArray.push(new FormControl('', { nonNullable: true, updateOn: 'blur' }), { emitEvent: false });
            return;
        }
    }

    private checkDeleted(): void {
        const values = this.controlArray.value.slice(0, -1);
        const emptyIndex = values.findIndex(item => this.isEmpty(item));

        if (emptyIndex === -1) {
            return;
        }

        this.controlArray.removeAt(emptyIndex, { emitEvent: false });
    }

    protected abstract isEmpty(value: string): boolean;
}