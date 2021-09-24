import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryPayAgainComponent } from './try-pay-again.component';

describe('TryPayAgainComponent', () => {
  let component: TryPayAgainComponent;
  let fixture: ComponentFixture<TryPayAgainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TryPayAgainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TryPayAgainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
