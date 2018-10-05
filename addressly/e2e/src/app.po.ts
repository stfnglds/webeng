import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
  getNavbarEntriesButton(){
    return element(by.className('navbarEntriesButton'));
  }
  getNavbarGroupsButton(){
    return element(by.className('navbarGroupsButton'));
  }
  getNavbarAddressbooksButton(){
    return element(by.className('navbarAddressbooksButton'));
  }
  getNewEntryButton(){
    return element(by.className('newEntryButton'));
  }
  getNewEntryAddressInput(){
    return element(by.className('entryInputAddress'));
  }
  getNewEntryNameInput(){
    return element(by.className('entryInputName'));
  }
  getNewEntrySaveButton(){
    return element(by.className('entrySaveButton'));
  }
  getEntryCardParent(){
    return element(by.className('entryCardsContainer'));
  }
  getEntryCards(){
    return element.all(by.className('card-body'));
  }
}
