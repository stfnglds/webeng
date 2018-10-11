import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {Addressbook} from "../model/addressbook";
import {Observable, throwError} from "rxjs";
import {Group} from "../model/group";
import {catchError} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AddressbooksService {
  private webServiceUrl = 'http://localhost:3000/api/addressbooks/';

  constructor(private http: HttpClient) { }

  public fetchAddressbooks(): Observable<Addressbook[]> {
    return this.http.get<Addressbook[]>(this.webServiceUrl).pipe(
      catchError(this.handleError)
    );
  }

  public createAddressbook(addressbook: Addressbook): Observable<Addressbook> {
    return this.http.post<Addressbook>(this.webServiceUrl, JSON.stringify(addressbook), httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public updateAddressbook(addressbook: Addressbook): Observable<Addressbook> {
    return this.http.put<Addressbook>(this.webServiceUrl + addressbook._id, JSON.stringify(addressbook), httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public deleteAddressbook(id: number): Observable<any> {
    return this.http.delete<any>(this.webServiceUrl + id).pipe(
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
    return throwError('AddressbooksService Connection Error - see console log for additional information');
  };

}
