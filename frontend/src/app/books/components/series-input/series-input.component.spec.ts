import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { SeriesService } from '../../../services/series.service';
import { StatisticService } from '../../../statistic/services/statistic.service';

import { SeriesInputComponent } from './series-input.component';

describe('SeriesInputComponent', () => {
  let component: SeriesInputComponent;
  let fixture: ComponentFixture<SeriesInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesInputComponent],
      providers: [
        {
          provide: SeriesService,
          useValue: {
            searchSeries: () => of([])
          }
        }
      ]
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
