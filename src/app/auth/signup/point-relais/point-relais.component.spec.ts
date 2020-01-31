import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointRelaisComponent } from './point-relais.component';

describe('PointRelaisComponent', () => {
  let component: PointRelaisComponent;
  let fixture: ComponentFixture<PointRelaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointRelaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointRelaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
