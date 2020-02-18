import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitChooseComponent } from './produit-choose.component';

describe('ProduitChooseComponent', () => {
  let component: ProduitChooseComponent;
  let fixture: ComponentFixture<ProduitChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduitChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
