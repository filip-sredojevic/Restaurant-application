import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazrestoranaComponent } from './prikazrestorana.component';

describe('PrikazrestoranaComponent', () => {
  let component: PrikazrestoranaComponent;
  let fixture: ComponentFixture<PrikazrestoranaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrikazrestoranaComponent]
    });
    fixture = TestBed.createComponent(PrikazrestoranaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
