import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {Group} from "../model/group";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

   private webServiceUrl = 'http://localhost:3000/api/groups/';

  constructor(private http: HttpClient) { }

  public fetchGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.webServiceUrl).pipe(
      catchError(this.handleError)
    );
  }

  public createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.webServiceUrl, JSON.stringify(group), httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public updateGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(this.webServiceUrl + group._id, JSON.stringify(group), httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public deleteGroup(id: number): Observable<any> {
    return this.http.delete<any>(this.webServiceUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  public getGroupById(id: number): Observable<any> {
    return this.http.get<any>(this.webServiceUrl + id).pipe(
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
    return throwError('GroupsService Connection Error - see console log for additional information');
  };
}
