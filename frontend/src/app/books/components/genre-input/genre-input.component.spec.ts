import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StatisticService } from '../../../statistic/services/statistic.service';

import { GenreInputComponent } from './genre-input.component';

describe('GenreInputComponent', () => {
  let component: GenreInputComponent;
  let fixture: ComponentFixture<GenreInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreInputComponent],
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
    
    fixture = TestBed.createComponent(GenreInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
