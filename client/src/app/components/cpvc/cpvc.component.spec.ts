import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpvcComponent } from './cpvc.component';

describe('CpvcComponent', () => {
  let component: CpvcComponent;
  let fixture: ComponentFixture<CpvcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpvcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpvcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
