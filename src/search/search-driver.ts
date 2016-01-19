/// <reference path='../../typings/tsd.d.ts'/>
import TicketList from '../common/ticketList';
import TicketsService from '../tickets.srv';

export default class SearchDriver {

  elem: JQuery;
  scope;

  constructor(elem, scope) {
    this.elem = elem;
    this.scope = scope;
  }

  static build(): SearchDriver {
    let elem, scope : any;
    inject(($rootScope, $compile, ticketsService: TicketsService) => {
      scope = $rootScope.$new();
      elem = $compile('<search></search>')(scope);
      scope.$digest();
    });
    return new SearchDriver(elem, scope);
  }

  getTitle(): string {
    return this.elem.find('h3').text();
  }

  getInput(): any {
    return this.elem.find('input');
  }

  clickOnInput(): void {
    this.elem.find('input').triggerHandler('click');
  }

  inputSearchPhrase(searchPhrase: string): void {
    //TODO
  };

  getSuggestions(): any {
    return this.elem.find('.suggestion');
  }
}
