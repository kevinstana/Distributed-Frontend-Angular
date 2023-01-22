import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyContractComponent } from './view-my-contract.component';

describe('ViewMyContractComponent', () => {
  let component: ViewMyContractComponent;
  let fixture: ComponentFixture<ViewMyContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMyContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
