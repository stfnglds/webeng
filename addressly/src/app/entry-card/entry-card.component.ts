import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Entry} from "../model/entry";
import {EntriesService} from "../services/entries.service";
import {GroupsService} from "../services/groups.service";
import {Group} from "../model/group";

@Component({
  selector: 'app-entry-card',
  templateUrl: './entry-card.component.html',
  styleUrls: ['./entry-card.component.scss']
})


export class EntryCardComponent implements OnInit {

  public groupName="";
  public groups:Group[];
  public entry:Entry;


  @Input('data')
  set data(entry:Entry){
   this.entry=entry;
   if(this.entry.group){
     this._groupService.getGroupById(this.entry.group).subscribe(
       data=>{
         try{
           this.groupName=data[0].name;
         }catch(e){
           console.log("entry " + entry._id + " has no group");
         }
       },
       error =>{
         console.log(error);
       }
     );
   }
  }

  @Output()
  deleted = new EventEmitter<void>();

  constructor(private _entriesService: EntriesService, private _groupService: GroupsService) {
    this.entry={name:""};
    this.loadGroups();
  }

  private loadGroups() {
    this._groupService.fetchGroups().subscribe(data => {

      this.groups=data;
    }, error => {
      console.log('Failed fetching groups');
    });
  }

  deleteEntry() {
    this._entriesService.deleteEntry(this.entry._id).subscribe(
      data => {
        this.deleted.emit();
      },
      error => {
        console.log('Failed to delete entry');
      }
    );
  }

  saveEntry(updatedEntry) {
    this._entriesService.updateEntry(updatedEntry).subscribe(
      data =>{

      },
      error => {
        console.log('Failed to update entry');
      }
    );
  }


  ngOnInit() {

  }

}
