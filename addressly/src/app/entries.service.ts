import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {Observable} from 'rxjs/Observable';
import {Entry} from "./model/entry";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class EntriesService {

  private webServiceUrl = 'http://localhost:3000/api/entries/';

  constructor(private http: HttpClient) { }

  public fetchCalendarEntries(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.webServiceUrl);
  }

  public updateEntry(entry: Entry): Observable<Entry> {
    return this.http.put<Entry>(this.webServiceUrl + entry.id, JSON.stringify(entry), httpOptions);
  }

  public deleteEntry(id: number): Observable<any> {
    return this.http.delete<any>(this.webServiceUrl + id);
  }
  /* public fetchCalendarEntry(id: number): Observable<Entry> {
     return this.http.get<Entry>(this.webServiceUrl + id);
   }
   public createCalendarEntry(entry: Entry): Observable<Entry> {
     return this.http.post<Entry>(this.webServiceUrl, JSON.stringify(entry), httpOptions);
   }

   public deleteCalendarEntries(entry: Entry): Observable<any> {
     return this.http.delete<any>(this.webServiceUrl + entry.id);
   }*/
}

