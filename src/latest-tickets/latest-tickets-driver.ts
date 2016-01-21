/// <reference path='../../typings/tsd.d.ts'/>
import Ticket from '../common/ticket';

export default class LatestTicketsDriver {

  elem: JQuery;
  scope;

  constructor(elem, scope) {
    this.elem = elem;
    this.scope = scope;
  }

  static build(tickets: Ticket[]): LatestTicketsDriver {
    let elem, scope : any;
    inject(($rootScope, $compile) => {
      scope = $rootScope.$new();
      scope.tickets = tickets;
      elem = $compile('<latest-tickets tickets="tickets"></latest-tickets>')(scope);
      scope.$digest();
    });
    return new LatestTicketsDriver(elem, scope);
  }

  getLatestTicketsTitle(): string {
    return this.elem.find('h3').text();
  }

  getTicketListLength(): number {
    return this.elem.find('.ticket').length;
  }

  getTicketTitleAt(i): string {
    return this.elem.find('.ticket-title').eq(i).text();
  }

  getTicketContentAt(i): string {
    return this.elem.find('.ticket-content').eq(i).text();
  }

}
