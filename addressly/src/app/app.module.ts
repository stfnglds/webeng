import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
//import { EventDetailComponent } from './event-detail/event-detail.component';
//import { EventTitleComponent } from './event-title/event-title.component';
//import { DetailViewComponent } from './detail-view/detail-view.component';
//import { ListViewComponent } from './list-view/list-view.component';
import { AllEntriesComponent } from './all-entries/all-entries.component';
import { OverviewComponent } from './overview/overview.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OverviewComponentComponent } from './overview-component/overview-component.component';
import {AllGroupsComponent} from "./all-groups/all-groups.component";
import { AllAddressbooksComponent } from './all-addressbooks/all-addressbooks.component';
import { EntryCardComponent } from './entry-card/entry-card.component';


const appRoutes: Routes = [
  { path: '**', redirectTo: 'entries'},
  { path: 'entries', component: AllEntriesComponent },
  { path: 'groups', component: AllGroupsComponent },
  { path: 'addressbooks', component: AllAddressbooksComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AllEntriesComponent,
    NavbarComponent,
    OverviewComponent,
    AllGroupsComponent,
    AllAddressbooksComponent,
    EntryCardComponent
   // EventDetailComponent,
   // EventTitleComponent,
   // DetailViewComponent,
   // ListViewComponent
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



