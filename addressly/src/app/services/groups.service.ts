import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Group} from "../model/group";
import {Observable} from "rxjs";


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
    return this.http.get<Group[]>(this.webServiceUrl);
  }

  public updateGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(this.webServiceUrl + group.id, JSON.stringify(group), httpOptions);
  }

  public deleteGroup(id: number): Observable<any> {
    return this.http.delete<any>(this.webServiceUrl + id);
  }

}
