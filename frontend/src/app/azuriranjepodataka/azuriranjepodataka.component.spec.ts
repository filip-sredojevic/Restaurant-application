import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzuriranjepodatakaComponent } from './azuriranjepodataka.component';

describe('AzuriranjepodatakaComponent', () => {
  let component: AzuriranjepodatakaComponent;
  let fixture: ComponentFixture<AzuriranjepodatakaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AzuriranjepodatakaComponent]
    });
    fixture = TestBed.createComponent(AzuriranjepodatakaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
