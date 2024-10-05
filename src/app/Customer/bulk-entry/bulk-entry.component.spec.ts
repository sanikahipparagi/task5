import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkEntryComponent } from './bulk-entry.component';

describe('BulkEntryComponent', () => {
  let component: BulkEntryComponent;
  let fixture: ComponentFixture<BulkEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
