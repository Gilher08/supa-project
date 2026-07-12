import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vins } from './vins';

describe('Vins', () => {
  let component: Vins;
  let fixture: ComponentFixture<Vins>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vins],
    }).compileComponents();

    fixture = TestBed.createComponent(Vins);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
