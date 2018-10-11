import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from "@angular/platform-browser";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {RouterModule} from "@angular/router";
import {AllEntriesComponent} from "./all-entries/all-entries.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {AllGroupsComponent} from "./all-groups/all-groups.component";
import {AllAddressbooksComponent} from "./all-addressbooks/all-addressbooks.component";
import {EntryCardComponent} from "./entry-card/entry-card.component";
import {GroupByPipe} from "./pipes/group-by.pipe";
import {CUSTOM_ELEMENTS_SCHEMA, Input} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({

      imports:[
        BrowserModule,
        FormsModule,
        RouterTestingModule
    ],
      declarations: [
        AppComponent,
        AllEntriesComponent,
        NavbarComponent,
        AllGroupsComponent,
        AllAddressbooksComponent,
        EntryCardComponent,
        GroupByPipe
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'addressly'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('addressly');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to addressly!');
  // }));
});
