import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheDialog } from './tache-dialog';

describe('TacheDialog', () => {
  let component: TacheDialog;
  let fixture: ComponentFixture<TacheDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TacheDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(TacheDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
