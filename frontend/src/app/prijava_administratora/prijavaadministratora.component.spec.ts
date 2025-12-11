import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijavaadministratoraComponent } from './prijavaadministratora.component';

describe('PrijavaadministratoraComponent', () => {
  let component: PrijavaadministratoraComponent;
  let fixture: ComponentFixture<PrijavaadministratoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrijavaadministratoraComponent]
    });
    fixture = TestBed.createComponent(PrijavaadministratoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
