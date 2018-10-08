import { Component, OnInit } from '@angular/core';
import { Addressbook } from '../model/Addressbook';
import {AddressbooksService} from "../services/addressbooks.service";

@Component({
  selector: 'app-all-addressbooks',
  templateUrl: './all-addressbooks.component.html',
  styleUrls: ['./all-addressbooks.component.scss']
})
export class AllAddressbooksComponent implements OnInit {
  constructor(private _addressbookService: AddressbooksService) {
  }

  addressbooks: Addressbook[];

  ngOnInit(): void {
    this.loadAddressbooks();
  }

  private loadAddressbooks() {
    this._addressbookService.fetchAddressbooks().subscribe(data => {

      this.addressbooks=data;
    }, error => {
      console.log('Failed fetching addressbooks');
    });
  }

  saveAddressbook(updatedAddressbook) {
    console.log(updatedAddressbook);
    this._addressbookService.updateAddressbook(updatedAddressbook).subscribe(
      data =>{
        this.loadAddressbooks();
      }
    );
  }

  createAddressbook() {
    this._addressbookService.createAddressbook({name:"new addressbook"}).subscribe(
      data =>{
        this.loadAddressbooksAndPutNewAddressbookFirst();
      }
    );
  }

  private loadAddressbooksAndPutNewAddressbookFirst() {
    this._addressbookService.fetchAddressbooks().subscribe(data => {

      this.addressbooks=data;
      this.addressbooks.unshift(this.addressbooks.pop());
      this.addressbooks[0].editMode=true;
    }, error => {
      console.log('Failed fetching addressbooks');
    });
  }
  
  deleteAddressbook(id: number) {
    this._addressbookService.deleteAddressbook(id).subscribe(
      data =>{
        this.loadAddressbooks();
      }
    );
  }


}

