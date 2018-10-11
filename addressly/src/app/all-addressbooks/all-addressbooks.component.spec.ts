import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAddressbooksComponent } from './all-addressbooks.component';
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AllAddressbooksComponent', () => {
  let component: AllAddressbooksComponent;
  let fixture: ComponentFixture<AllAddressbooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule,
        HttpClientTestingModule,
      ],
      declarations: [ AllAddressbooksComponent ],
      schemas:[NO_ERRORS_SCHEMA]
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
