import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducteurListComponent } from './producteur-list.component';

describe('ProducteurListComponent', () => {
  let component: ProducteurListComponent;
  let fixture: ComponentFixture<ProducteurListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducteurListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducteurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
