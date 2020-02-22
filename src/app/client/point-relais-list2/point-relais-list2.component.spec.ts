import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointRelaisList2Component } from './point-relais-list2.component';

describe('PointRelaisList2Component', () => {
  let component: PointRelaisList2Component;
  let fixture: ComponentFixture<PointRelaisList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointRelaisList2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointRelaisList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
