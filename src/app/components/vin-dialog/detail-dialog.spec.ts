import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDialog } from './detail-dialog';

describe('DetailDialog', () => {
  let component: DetailDialog;
  let fixture: ComponentFixture<DetailDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
