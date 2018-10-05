import {AppPage} from './app.po';
import {$, $$, browser, by, element} from "protractor";

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  //Simple Router tests
  it('should change URL when navbar is clicked', () => {
    page.navigateTo();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/');

    page.getNavbarEntriesButton().click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/entries');

    page.getNavbarGroupsButton().click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/groups');

    page.getNavbarAddressbooksButton().click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/addressbooks');

    //make sure routing works from different pages

    page.getNavbarEntriesButton().click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/entries');

    page.getNavbarGroupsButton().click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/groups');

    page.getNavbarAddressbooksButton().click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/addressbooks');
  });

  //Simple Router tests
  it('should create a new entry', async () => {
    page.navigateTo();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/');
    page.getNavbarEntriesButton().click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/entries');


    var entryCount = await $$('app-entry-card').count();

    page.getNewEntryButton().click();
    const newNameString1 = "Random 1234 :_$§";
    const newNameString2 = "1234 :_$§ Random";
    page.getNewEntryNameInput().sendKeys(newNameString1);
    page.getNewEntryAddressInput().sendKeys(newNameString2);
    page.getNewEntrySaveButton().click();

    expect(page.getEntryCards().count()).toBe(entryCount + 1);
  });

  it('should delete an entry', async () => {
    page.navigateTo();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/');
    page.getNavbarEntriesButton().click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/entries');

    var entryCount = await $$('app-entry-card').count();
    $$(".deleteButton").last().click();

    $$(".reallyDeleteEntryButton").last().click();
    expect(page.getEntryCards().count()).toBe(entryCount - 1);
  });
});

