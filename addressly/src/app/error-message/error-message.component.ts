import {Component, Input, OnInit} from '@angular/core';
import {Entry} from "../model/entry";

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  constructor() { }

  @Input('data') error:string;

  ngOnInit() {
  }

}
