import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodavanjerestoranaComponent } from './dodavanjerestorana.component';

describe('DodavanjerestoranaComponent', () => {
  let component: DodavanjerestoranaComponent;
  let fixture: ComponentFixture<DodavanjerestoranaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodavanjerestoranaComponent]
    });
    fixture = TestBed.createComponent(DodavanjerestoranaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
