import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointRelaisListComponent } from './point-relais-list.component';

describe('PointRelaisListComponent', () => {
  let component: PointRelaisListComponent;
  let fixture: ComponentFixture<PointRelaisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointRelaisListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointRelaisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
