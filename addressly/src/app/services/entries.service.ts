import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
//import {Observable} from 'rxjs/Observable';
import {Entry} from "../model/entry";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

/**
 * @ngdoc service  //Mark the object as a service.
 * @name app.EntriesService // Provide the module and the service name
 **/

export class EntriesService {

  private webServiceUrl = 'http://localhost:3000/api/entries/';

  constructor(private http: HttpClient) { }

  public fetchCalendarEntries(): Observable<Entry[]> {
    //return this.http.get<Entry[]>(this.webServiceUrl);
    return this.http.get<Entry[]>(this.webServiceUrl).pipe(
          catchError(this.handleError)
        );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('EntriesService Connection Error - see console log for additional information');
  };

  public updateEntry(entry: Entry): Observable<Entry> {
    return this.http.put<Entry>(this.webServiceUrl + entry._id, JSON.stringify(entry), httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public deleteEntry(id: number): Observable<any> {
    return this.http.delete<any>(this.webServiceUrl + id).pipe(
      catchError(this.handleError)
    );
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
  public createEntry(entry: Entry) : Observable<Entry>{
    return this.http.post<any>(this.webServiceUrl,entry);
  }
}

