/// <reference path='../../typings/tsd.d.ts'/>
import TicketList from '../common/ticketList';
import TicketsService from '../tickets.srv';

export default class LatestTicketsDriver {

  elem: JQuery;
  scope;
  $timeout: ng.ITimeoutService;

  constructor(elem, scope) {
    this.elem = elem;
    this.scope = scope;
  }

  static build(items: TicketList): LatestTicketsDriver {
    let elem, scope : any;
    inject(($rootScope, $compile, ticketsService: TicketsService) => {
      scope = $rootScope.$new();
      scope.title = 'testing latest tickets';
      scope.items = items;
      elem = $compile('<latest-tickets ng-model="items"></latest-tickets>')(scope);
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

  clickOnTicketAt(i): void {
    this.elem.find('.ticket').eq(i).triggerHandler('click');
  };
}
