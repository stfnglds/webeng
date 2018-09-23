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


const appRoutes: Routes = [
  { path: 'entries', component: AllEntriesComponent },
  { path: '**', component: OverviewComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AllEntriesComponent,
    NavbarComponent,
    OverviewComponent
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



