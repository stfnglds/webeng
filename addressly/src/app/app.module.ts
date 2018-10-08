import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Pipe, PipeTransform} from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
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


const appRoutes: Routes = [
  { path: 'entries', component: AllEntriesComponent },
  { path: 'groups', component: AllGroupsComponent },
  { path: 'addressbooks', component: AllAddressbooksComponent },
  { path: '**', redirectTo: 'entries',pathMatch:'full'}
];



@NgModule({
  declarations: [
    AppComponent,
    AllEntriesComponent,
    NavbarComponent,
    AllGroupsComponent,
    AllAddressbooksComponent,
    EntryCardComponent,
    GroupByPipe
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )

   // RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}



