import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Addressbook} from "../model/addressbook";
import {Observable} from "rxjs";
import {Group} from "../model/group";

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
    return this.http.get<Addressbook[]>(this.webServiceUrl);
  }

  public createAddressbook(addressbook: Addressbook): Observable<Addressbook> {
    return this.http.post<Addressbook>(this.webServiceUrl, JSON.stringify(addressbook), httpOptions);
  }

  public updateAddressbook(addressbook: Addressbook): Observable<Addressbook> {
    return this.http.put<Addressbook>(this.webServiceUrl + addressbook._id, JSON.stringify(addressbook), httpOptions);
  }

  public deleteAddressbook(id: number): Observable<any> {
    return this.http.delete<any>(this.webServiceUrl + id);
  }

}
