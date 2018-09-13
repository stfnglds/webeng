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
  testArray: {
    "blabla",
    "blablablablabla",
    "bla"
  };



  title: string;

  ngOnInit(): void {
    this.loadCalendarEntries();
  }

  private loadCalendarEntries() {
    this._dataService.fetchCalendarEntries().subscribe(data => {
      this.entries = data;
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

}

