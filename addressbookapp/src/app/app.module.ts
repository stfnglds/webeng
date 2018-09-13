import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EntryComponentComponent } from './entry-component/entry-component.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryComponentComponent
  ],
  imports: [AlertModule.forRoot(),
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
