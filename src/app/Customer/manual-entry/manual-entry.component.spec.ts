import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualEntryComponent } from './manual-entry.component';

describe('ManualEntryComponent', () => {
  let component: ManualEntryComponent;
  let fixture: ComponentFixture<ManualEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
