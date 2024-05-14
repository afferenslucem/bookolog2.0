import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { TypeSelectComponent } from './type-select.component';

describe('TypeSelectComponent', () => {
  let component: TypeSelectComponent;
  let fixture: ComponentFixture<TypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeSelectComponent);
    component = fixture.componentInstance;

    component.control = new FormControl();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
