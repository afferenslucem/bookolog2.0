import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { ArrayInputComponent } from '../../../shared/components/array-input.component';
import { FormLayoutModule } from '../../../shared/form-layout/form-layout.module';
import { TagComboboxComponent } from '../tag-combobox/tag-combobox.component';

@Component({
    selector: 'tags-input',
    standalone: true,
    imports: [
        FormLayoutModule,
        NgForOf,
        TagComboboxComponent,
    ],
    templateUrl: './tags-input.component.html',
    styleUrl: './tags-input.component.scss',
    providers: [TuiDestroyService],
})
export class TagsInputComponent extends ArrayInputComponent implements OnInit {
    public constructor(destroy$: TuiDestroyService) {
        super(destroy$);
    }

    protected override isEmpty(value: string): boolean {
        return !value.trim();
    }
}
