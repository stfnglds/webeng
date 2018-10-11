import {Component, EventEmitter, OnInit, Output, Pipe, PipeTransform} from '@angular/core';
import {Entry} from '../model/Entry';
import {Group} from '../model/Group';
import {GroupFilter} from '../model/GroupFilter';
import {EntriesService} from '../services/entries.service';
import {GroupsService} from '../services/groups.service';
import {Addressbook} from "../model/addressbook";
import {AddressbooksService} from "../services/addressbooks.service";

@Component({
  selector: 'app-all-entries',
  templateUrl: './all-entries.component.html',
  styleUrls: ['./all-entries.component.scss'],
  providers: [EntriesService, GroupsService]
})


export class AllEntriesComponent implements OnInit {


  constructor(private _dataService: EntriesService, private _groupService: GroupsService, private _addressbookService: AddressbooksService) {
  }

  entries: Entry[];
  groups: Group[];
  addressbooks: Addressbook[];
  groupsFilter: Group[][];
  filteredGroup: number;
  filteredRating: number;

  errorText: string;

  title: string;

  @Output()
  deleted = new EventEmitter<void>();

  ngOnInit(): void {
    this.errorText='';
    this.loadEntries();
    this.loadGroups();
    this.loadAddressbooks();
    // this.loadGroupFilters();
    this.filteredGroup = -1;
    this.filteredRating = 1;
  }


  private loadGroups() {
    this._groupService.fetchGroups().subscribe(data => {

      this.groups = data.sort(function (a: Group, b: Group) {
        return a.addressbook - b.addressbook
      });
    }, error => {
      this.errorText += error +"\n";
    });
  }

  private loadAddressbooks() {
    this._addressbookService.fetchAddressbooks().subscribe(data => {
      this.addressbooks = data.sort(function (a: Addressbook, b: Addressbook) {
        return a._id - b._id
      });
    }, error => {
      this.errorText += error +"\n";
    });
  }

  private loadEntries() {
    this._dataService.fetchCalendarEntries().subscribe(data => {
      this.entries = data;
    }, error => {

      this.errorText += error +"\n";
      //this.errorText += "\n";
    });
  }


  createEntry() {
    this._dataService.createEntry({name: "new Entry", rating: 1}).subscribe(
      data => {
        this.loadGroupsAndPutNewGroupFirst();
      },
      error => {
        this.errorText += error +"\n";
      }
    );
  }

  onDeleted(): void {
    this.loadEntries();
  }

  private loadGroupsAndPutNewGroupFirst() {
    this._dataService.fetchCalendarEntries().subscribe(data => {

      this.entries = data;
      this.entries.unshift(this.entries.pop());
      this.entries[0].editMode = true;
      //  this.entries=[{}];
    }, error => {
      this.errorText += error +"\n";
    });
  }

}

