import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkCashComponent } from './mark-cash.component';

describe('MarkCashComponent', () => {
  let component: MarkCashComponent;
  let fixture: ComponentFixture<MarkCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkCashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
