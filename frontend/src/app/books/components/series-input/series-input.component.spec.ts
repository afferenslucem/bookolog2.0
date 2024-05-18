import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { PrefillService } from '../../../services/prefill.service';

import { SeriesInputComponent } from './series-input.component';

describe('SeriesInputComponent', () => {
    let component: SeriesInputComponent;
    let fixture: ComponentFixture<SeriesInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SeriesInputComponent],
            providers: [
                {
                    provide: PrefillService,
                    useValue: {
                        getSeries: () => of([]),
                    },
                },
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(SeriesInputComponent);
        component = fixture.componentInstance;

        component.control = new FormControl();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
