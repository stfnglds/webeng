import {Component, EventEmitter, OnInit, Output, Pipe, PipeTransform} from '@angular/core';
import { Entry } from '../model/Entry';
import { Group } from '../model/Group';
import { EntriesService } from '../services/entries.service';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-all-entries',
  templateUrl: './all-entries.component.html',
  styleUrls: ['./all-entries.component.scss'],
  providers: [EntriesService,GroupsService]
})


export class AllEntriesComponent implements OnInit {


  constructor(private _dataService: EntriesService,private _groupService: GroupsService) {
  }

  entries: Entry[];
  groups: Group[];

  title: string;

  @Output()
  deleted = new EventEmitter<void>();

  ngOnInit(): void {
    this.loadEntries();
    this.loadGroups();
  }


  private loadGroups() {
    this._groupService.fetchGroups().subscribe(data => {

      this.groups=data;
    }, error => {
      console.log('Failed fetching groups');
    });
  }

  private loadEntries() {
    this._dataService.fetchCalendarEntries().subscribe(data => {
      this.entries=data;
    }, error => {
      console.log('Failed fetching entries');
    });
  }

  saveEntry(updatedEntry) {
    this._dataService.updateEntry(updatedEntry).subscribe(
      data =>{
        this.loadEntries();
      }
    );
  }

  createEntry() {
    this._dataService.createEntry({name:"new Entry",editMode:true}).subscribe(
      data =>{
        this.loadGroupsAndPutNewGroupFirst();
      }
    );
  }

  deleteEntry(id: number) {
    this._dataService.deleteEntry(id).subscribe(
      data =>{
        this.loadEntries();
      }
    );
  }

  public getGroupNameFromId(searchId: number){
    return this.groups.find( group => group._id === searchId);
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
}

