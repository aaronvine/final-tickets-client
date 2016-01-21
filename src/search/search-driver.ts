/// <reference path='../../typings/tsd.d.ts'/>
import Ticket from '../common/ticket';

export default class SearchDriver {

  elem: JQuery;
  scope;

  constructor(elem, scope) {
    this.elem = elem;
    this.scope = scope;
  }

  static build(tickets: Ticket[]): SearchDriver {
    let elem, scope : any;
    inject(($rootScope, $compile) => {
      scope = $rootScope.$new();
      scope.tickets = tickets;
      elem = $compile('<search tickets="tickets"></search>')(scope);
      scope.$digest();
    });
    return new SearchDriver(elem, scope);
  }

  getTitle(): string {
    return this.elem.find('h3').text();
  }

  getInput(): JQuery {
    return this.elem.find('input');
  }

  clickOnInput(): void {
    this.elem.find('input').triggerHandler('click');
  }

  inputSearchPhrase(searchPhrase: string): void {
    this.getInput().val(searchPhrase);
    this.scope.$digest();
  };

  getSuggestions(): any {
    return this.elem.find('.suggestion');
  }
}
