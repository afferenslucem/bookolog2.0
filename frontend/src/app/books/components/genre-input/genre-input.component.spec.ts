import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
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

    component.control = new FormControl();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
