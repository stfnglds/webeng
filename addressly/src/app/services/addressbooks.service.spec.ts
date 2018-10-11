import { TestBed } from '@angular/core/testing';

import { AddressbooksService } from './addressbooks.service';
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AllGroupsComponent} from "../all-groups/all-groups.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AddressbooksService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: AddressbooksService = TestBed.get(AddressbooksService);
    expect(service).toBeTruthy();
  });
});
