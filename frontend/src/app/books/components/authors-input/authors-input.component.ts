import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { ArrayInputComponent } from '../../../shared/components/array-input.component';
import { FormLayoutModule } from '../../../shared/form-layout/form-layout.module';
import { AuthorComboboxComponent } from '../author-combobox/author-combobox.component';

@Component({
    selector: 'authors-input',
    standalone: true,
    imports: [
        FormLayoutModule,
        NgForOf,
        AuthorComboboxComponent,
    ],
    templateUrl: './authors-input.component.html',
    styleUrl: './authors-input.component.scss',
    providers: [TuiDestroyService],
})
export class AuthorsInputComponent extends ArrayInputComponent implements OnInit {
    public constructor(destroy$: TuiDestroyService) {
        super(destroy$);
    }

    protected override isEmpty(value: string): boolean {
        return !value.trim();
    }
}
