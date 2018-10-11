import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageComponent } from './error-message.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule, HttpClientTestingModule],
      declarations: [ ErrorMessageComponent ],
      schemas:[NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
