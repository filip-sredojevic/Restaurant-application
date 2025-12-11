import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodavanjekonobaraComponent } from './dodavanjekonobara.component';

describe('DodavanjekonobaraComponent', () => {
  let component: DodavanjekonobaraComponent;
  let fixture: ComponentFixture<DodavanjekonobaraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodavanjekonobaraComponent]
    });
    fixture = TestBed.createComponent(DodavanjekonobaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
