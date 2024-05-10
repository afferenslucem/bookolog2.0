import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { StatisticService } from '../../../statistic/services/statistic.service';

import { TagsInputComponent } from './tags-input.component';

describe('AuthorsComponent', () => {
    let component: TagsInputComponent;
    let fixture: ComponentFixture<TagsInputComponent>;

    let array: FormArray<FormControl<string>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TagsInputComponent],
            providers: [
                {
                    provide: StatisticService,
                    useValue: {
                        getTags: () => of([])
                    }
                }
            ]
        })
            .compileComponents();

        array = new FormArray([new FormControl<string>('', { nonNullable: true })]);

        fixture = TestBed.createComponent(TagsInputComponent);
        component = fixture.componentInstance;

        component.controlArray = array;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('adds new control on fiil last', () => {
        component.controlArray.at(0).setValue('Alexandr Pushkin');

        expect(component.controlArray.length).toBe(2);
        expect(component.controlArray.at(1).value).toBe('');
    })

    it('removes last control if empty', () => {
        component.controlArray.at(0).setValue('Alexandr Pushkin');
        component.controlArray.at(1).setValue('Lev Tolstoy');
        component.controlArray.at(2).setValue('Anton Chekhov');

        component.controlArray.at(1).setValue('');

        expect(component.controlArray.length).toBe(3);
        expect(component.controlArray.at(1).value).toBe('Anton Chekhov');
        expect(component.controlArray.at(2).value).toBe('');
    })
});
