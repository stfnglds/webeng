import { Component, OnInit } from '@angular/core';
import { Entry } from '../model/Entry';
import { EntriesService } from '../entries.service';

@Component({
  selector: 'app-all-entries',
  templateUrl: './all-entries.component.html',
  styleUrls: ['./all-entries.component.scss'],
  providers: [EntriesService]
})
export class AllEntriesComponent implements OnInit {


  constructor(private _dataService: EntriesService) {
  }

  entries: Entry[];

  title: string;

  ngOnInit(): void {
    this.loadEntries();
  }

  private loadEntries() {
    this._dataService.fetchCalendarEntries().subscribe(data => {


      this.entries=data;
    //  this.entries=[{}];
    }, error => {
      console.log('Failed fetching entries');
    });
  }

  /*buttonClick() {
    let newEntry: Entry;
    newEntry = {
      title: this.title,
      organizer: 'test@something.com',
      start: '2018-01-01T12:00:00',
      end: '2018-01-01T12:00:00',
      status: 'Busy',
      allday: false
    }

    this._dataService.createCalendarEntry(newEntry).subscribe(
      data => {
        this.loadCalendarEntries();
      }
    );;
  }*/

 /* onDeleted(): void {
    this.loadCalendarEntries();
  }*/

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

