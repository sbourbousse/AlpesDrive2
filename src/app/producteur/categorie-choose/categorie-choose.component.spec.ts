import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieChooseComponent } from './categorie-choose.component';

describe('CategorieChooseComponent', () => {
  let component: CategorieChooseComponent;
  let fixture: ComponentFixture<CategorieChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorieChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
