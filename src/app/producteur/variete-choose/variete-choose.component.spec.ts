import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarieteChooseComponent } from './variete-choose.component';

describe('VarieteChooseComponent', () => {
  let component: VarieteChooseComponent;
  let fixture: ComponentFixture<VarieteChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarieteChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarieteChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
