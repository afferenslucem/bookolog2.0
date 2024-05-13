import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StatisticService } from '../../../statistic/services/statistic.service';

import { SeriesInputComponent } from './series-input.component';

describe('GenreInputComponent', () => {
  let component: SeriesInputComponent;
  let fixture: ComponentFixture<SeriesInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesInputComponent],
      providers: [
        {
          provide: StatisticService,
          useValue: {
            getGenres: () => of([])
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeriesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
