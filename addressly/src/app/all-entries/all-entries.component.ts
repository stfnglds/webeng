import { Component, OnInit } from '@angular/core';
import { Entry } from '../model/Entry';
import { Group } from '../model/Group';
import { EntriesService } from '../entries.service';
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
    //  this.entries=[{}];
    }, error => {
      console.log('Failed fetching entries');
    });
  }

  saveEntry(updatedEvent) {
    this._dataService.updateEntry(updatedEvent).subscribe(
      data =>{
        this.loadEntries();
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
}

