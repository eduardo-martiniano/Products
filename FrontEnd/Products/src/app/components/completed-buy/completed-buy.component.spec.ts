import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedBuyComponent } from './completed-buy.component';

describe('CompletedBuyComponent', () => {
  let component: CompletedBuyComponent;
  let fixture: ComponentFixture<CompletedBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
