import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { StatusSelectComponent } from './status-select.component';

describe('StatusSelectComponent', () => {
  let component: StatusSelectComponent;
  let fixture: ComponentFixture<StatusSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusSelectComponent);
    component = fixture.componentInstance;

    component.control = new FormControl();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
