import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAddressbooksComponent } from './all-addressbooks.component';

describe('AllAddressbooksComponent', () => {
  let component: AllAddressbooksComponent;
  let fixture: ComponentFixture<AllAddressbooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAddressbooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAddressbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
