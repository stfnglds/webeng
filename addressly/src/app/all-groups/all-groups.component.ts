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

  title: string;

  ngOnInit(): void {
    this.loadGroups();
    this.loadAddressbooks();
  }

  private loadAddressbooks() {
    this._addressbookService.fetchAddressbooks().subscribe(data => {

      this.addressbooks=data;
    }, error => {
      console.log('Failed fetching addressbooks');
    });
  }


  private loadGroups() {
    this._groupService.fetchGroups().subscribe(data => {

      this.groups=data;
    }, error => {
      console.log('Failed fetching groups');
    });
  }

  private loadGroupsAndPutNewGroupFirst() {
    this._groupService.fetchGroups().subscribe(data => {

      this.groups=data;
      this.groups.unshift(this.groups.pop());
      this.groups[0].editMode=true;
    }, error => {
      console.log('Failed fetching groups');
    });
  }

  saveGroup(updatedGroup) {
    console.log(updatedGroup);
    this._groupService.updateGroup(updatedGroup).subscribe(
      data =>{
        this.loadGroups();
      }
    );
  }

  createGroup() {
    this._groupService.createGroup({name:"new groupName"}).subscribe(
      data =>{
        this.loadGroupsAndPutNewGroupFirst();
      }
    );
  }

  deleteGroup(id: number) {
    this._groupService.deleteGroup(id).subscribe(
      data =>{
        this.loadGroups();
      }
    );
  }


}

