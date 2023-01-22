import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContractNotaryComponent } from './view-contract-notary.component';

describe('ViewContractNotaryComponent', () => {
  let component: ViewContractNotaryComponent;
  let fixture: ComponentFixture<ViewContractNotaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewContractNotaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewContractNotaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
