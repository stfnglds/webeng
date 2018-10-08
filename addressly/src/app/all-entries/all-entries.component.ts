import {Component, EventEmitter, OnInit, Output, Pipe, PipeTransform} from '@angular/core';
import { Entry } from '../model/Entry';
import { Group } from '../model/Group';
import { GroupFilter } from '../model/GroupFilter';
import { EntriesService } from '../services/entries.service';
import { GroupsService } from '../services/groups.service';
import {Addressbook} from "../model/addressbook";
import {AddressbooksService} from "../services/addressbooks.service";

@Component({
  selector: 'app-all-entries',
  templateUrl: './all-entries.component.html',
  styleUrls: ['./all-entries.component.scss'],
  providers: [EntriesService,GroupsService]
})


export class AllEntriesComponent implements OnInit {


  constructor(private _dataService: EntriesService,private _groupService: GroupsService,private _addressbookService: AddressbooksService) {
  }

  entries: Entry[];
  groups: Group[];
  addressbooks: Addressbook[];
  groupsFilter:Group[][];
  filteredGroup: number;
  filteredRating: number;

  title: string;

  @Output()
  deleted = new EventEmitter<void>();

  ngOnInit(): void {
    this.loadEntries();
    this.loadGroups();
    this.loadAddressbooks();
    // this.loadGroupFilters();
    this.filteredGroup=-1;
    this.filteredRating=1;
  }


  private loadGroups() {
    this._groupService.fetchGroups().subscribe(data => {

      this.groups=data.sort(function(a:Group, b:Group){return a.addressbook-b.addressbook});
      // this.groupsFilter=this.groups.reduce(function (r:Group, a:Group) {
      //   r[a.addressbook] = r[a.addressbook] || [];
      //   r[a.addressbook].push(a);
      //   return r;
      // }, Object.create(null));

    //   this.groups.forEach(function(item){
    //     console.log("item",item);
    //     console.log("groupsFilter[1]",this.groupsFilter[1]);
    //     var addressbookList=this.groupsFilter[item.addressbook];
    //
    //     if(addressbookList){
    //       addressbookList.push(item);
    //     } else{
    //       this.groupsFilter[item.addressbook] = [item];
    //     }
    //
    //   });
    //   console.log("groups filter",this.groupsFilter);
    // }, error => {
    //   console.log('Failed fetching groups');
    });
  }
  private loadAddressbooks() {
    this._addressbookService.fetchAddressbooks().subscribe(data => {

      this.addressbooks=data.sort(function(a:Addressbook, b:Addressbook){return a._id-b._id});
    });
  }

  private loadEntries() {
    this._dataService.fetchCalendarEntries().subscribe(data => {
      this.entries=data;
    }, error => {
      console.log('Failed fetching entries');
    });
  }


  createEntry() {
    this._dataService.createEntry({name:"new Entry",rating:1}).subscribe(
      data =>{
        this.loadGroupsAndPutNewGroupFirst();
      }
    );
  }

  // deleteEntry(id: number) {
  //   this._dataService.deleteEntry(id).subscribe(
  //     data =>{
  //       this.loadEntries();
  //     }
  //   );
  // }

  // public getGroupNameFromId(searchId: number){
  //   return this.groups.find( groupName => groupName._id === searchId);
  // }

  onDeleted(): void {
    this.loadEntries();
  }

  private loadGroupsAndPutNewGroupFirst() {
    this._dataService.fetchCalendarEntries().subscribe(data => {

      this.entries=data;
      this.entries.unshift(this.entries.pop());
      this.entries[0].editMode=true;
      //  this.entries=[{}];
    }, error => {
      console.log('Failed fetching entries');
    });
  }

  // private loadGroupFilters() {
  //   this._groupService.fetchGroups().subscribe(data => {
  //       data.forEach(group => {
  //         var filter : GroupFilter;
  //         filter._id=group._id;
  //         filter.name=group.name;
  //         filter.activated=false;
  //         this.groupFilters.push(filter);
  //       });
  //       console.log("groupFilters loaded");
  //   }, error => {
  //     console.log('Failed fetching groups');
  //   });
  // }
}

