import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEntriesComponent } from './all-entries.component';
import {FormsModule} from "@angular/forms";
import {GroupByPipe} from '../pipes/group-by.pipe';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AllEntriesComponent', () => {
  let component: AllEntriesComponent;
  let fixture: ComponentFixture<AllEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [ AllEntriesComponent,GroupByPipe ],
      providers:[GroupByPipe],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
