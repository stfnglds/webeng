import {CUSTOM_ELEMENTS_SCHEMA, Input, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//import {NgModule, Pipe, PipeTransform} from '@angular/core';
//import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AllEntriesComponent } from './all-entries/all-entries.component';
import { NavbarComponent } from './navbar/navbar.component';
import {AllGroupsComponent} from "./all-groups/all-groups.component";
import { AllAddressbooksComponent } from './all-addressbooks/all-addressbooks.component';
import { EntryCardComponent } from './entry-card/entry-card.component';
import { GroupByPipe } from './pipes/group-by.pipe';
import { ErrorMessageComponent } from './error-message/error-message.component';

const appRoutes: Routes = [
  { path: 'entries', component: AllEntriesComponent },
  { path: 'groups', component: AllGroupsComponent },
  { path: 'addressbooks', component: AllAddressbooksComponent },
  { path: '**', redirectTo: 'entries',pathMatch:'full'}
];



@NgModule({

  imports: [
    NgbModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AllEntriesComponent,
    NavbarComponent,
    AllGroupsComponent,
    AllAddressbooksComponent,
    EntryCardComponent,
    GroupByPipe,
    ErrorMessageComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {

}



