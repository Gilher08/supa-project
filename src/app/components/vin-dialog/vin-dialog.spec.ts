import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinDialog } from './vin-dialog';

describe('VinDialog', () => {
  let component: VinDialog;
  let fixture: ComponentFixture<VinDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(VinDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
