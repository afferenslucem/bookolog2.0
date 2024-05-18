import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { PrefillService } from '../../../services/prefill.service';

import { GenreInputComponent } from './genre-input.component';

describe('GenreInputComponent', () => {
    let component: GenreInputComponent;
    let fixture: ComponentFixture<GenreInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GenreInputComponent],
            providers: [
                {
                    provide: PrefillService,
                    useValue: {
                        getGenres: () => of([]),
                    },
                },
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(GenreInputComponent);
        component = fixture.componentInstance;

        component.control = new FormControl();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
