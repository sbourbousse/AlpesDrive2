import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteList2Component } from './vente-list2.component';

describe('VenteList2Component', () => {
  let component: VenteList2Component;
  let fixture: ComponentFixture<VenteList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenteList2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
