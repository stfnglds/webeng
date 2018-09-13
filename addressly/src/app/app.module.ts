import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
//import { EventDetailComponent } from './event-detail/event-detail.component';
//import { EventTitleComponent } from './event-title/event-title.component';
//import { DetailViewComponent } from './detail-view/detail-view.component';
//import { ListViewComponent } from './list-view/list-view.component';
import { AllEntriesComponent } from './all-entries/all-entries.component';

@NgModule({
  declarations: [
    AppComponent,
    AllEntriesComponent
   // EventDetailComponent,
   // EventTitleComponent,
   // DetailViewComponent,
   // ListViewComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
   // RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}



