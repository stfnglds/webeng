import { Component, OnInit } from '@angular/core';
import { Group } from '../model/Group';
import { GroupsService } from '../services/groups.service';
import {Addressbook} from "../model/addressbook";
import {AddressbooksService} from "../services/addressbooks.service";

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss']
})
export class AllGroupsComponent implements OnInit {
  constructor(private _groupService: GroupsService, private _addressbookService: AddressbooksService) {
  }

  groups: Group[];
  addressbooks: Addressbook[];
  errorText: string;
  title: string;

  ngOnInit(): void {
    this.errorText='';
    this.loadGroups();
    this.loadAddressbooks();
  }

  private loadAddressbooks() {
    this._addressbookService.fetchAddressbooks().subscribe(data => {

      this.addressbooks=data;
    }, error => {
      this.errorText += error +"\n";
    });
  }


  private loadGroups() {
    this._groupService.fetchGroups().subscribe(data => {

      this.groups=data;
    }, error => {
      this.errorText += error +"\n";
    });
  }

  private loadGroupsAndPutNewGroupFirst() {
    this._groupService.fetchGroups().subscribe(data => {

      this.groups=data;
      this.groups.unshift(this.groups.pop());
      this.groups[0].editMode=true;
    }, error => {
      this.errorText += error +"\n";
    });
  }

  saveGroup(updatedGroup) {
    console.log(updatedGroup);
    this._groupService.updateGroup(updatedGroup).subscribe(
      data =>{
        this.loadGroups();
      }, error => {
        this.errorText += error +"\n";
      }
    );
  }

  createGroup() {
    this._groupService.createGroup({name:"new groupName"}).subscribe(
      data =>{
        this.loadGroupsAndPutNewGroupFirst();
      }, error => {
        this.errorText += error +"\n";
      }
    );
  }

  deleteGroup(id: number) {
    this._groupService.deleteGroup(id).subscribe(
      data =>{
        this.loadGroups();
      }, error => {
        this.errorText += error +"\n";
      }
    );
  }


}

