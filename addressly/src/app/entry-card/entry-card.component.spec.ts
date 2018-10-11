import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryCardComponent } from './entry-card.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA, Input, NO_ERRORS_SCHEMA} from "@angular/core";
import {FormsModule} from "@angular/forms";

describe('EntryCardComponent', () => {
  let component: EntryCardComponent;
  let fixture: ComponentFixture<EntryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [ EntryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


describe('EntryCardComponent', () => {
  let component: EntryCardComponent;
  let fixture: ComponentFixture<EntryCardComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,],
      declarations: [EntryCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(async() => {
    fixture = TestBed.createComponent(EntryCardComponent);
    httpMock = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;
    component.entry = {
      name: 'testentry',
      address: 'testaddress 24',
      _id: 128
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire event',  () => {
    expect(component).toBeTruthy();

    spyOn(component.deleted, 'emit');

    component.deleteEntry();

    fixture.detectChanges();

    const eventRequest = httpMock.expectOne('http://localhost:3000/api/entries/128');
    expect(eventRequest.request.method).toEqual('DELETE');
    eventRequest.flush({});

    expect(component.deleted.emit).toHaveBeenCalled();

  });

  it('should not fire event if deletion fails', () => {
    expect(component).toBeTruthy();

    spyOn(component.deleted, 'emit');

    component.deleteEntry();
    fixture.detectChanges();

    const eventRequest = httpMock.expectOne('http://localhost:3000/api/entries/128');
    expect(eventRequest.request.method).toEqual('DELETE');
    eventRequest.flush({}, {status: 404, statusText: 'Bad Request'});

    expect(component.deleted.emit).not.toHaveBeenCalled();
  });
});
