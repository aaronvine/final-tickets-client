/// <reference path='../../typings/tsd.d.ts'/>
import TicketList from '../common/ticketList';
import Ticket from '../common/ticket';
import TicketsService from '../tickets.srv';

export default class TicketViewDriver {

  elem: JQuery;
  scope;

  constructor(elem, scope) {
    this.elem = elem;
    this.scope = scope;
  }

  static build(item: Ticket): TicketViewDriver {
    let elem, scope : any;
    inject(($rootScope, $compile, ticketsService: TicketsService) => {
      scope = $rootScope.$new();
      scope.item = item;
      elem = $compile('<ticket-view ticket="item"></ticket-view>')(scope);
      scope.$digest();
    });
    return new TicketViewDriver(elem, scope);
  }

  getEmail(): string {
    return this.elem.find('h3').text().split(' ')[1];
  }

  getRepliesDrv(): any {
    return this.elem.find('replies');
  }

  getReplySubmitDrv(): any {
    return this.elem.find('reply-submit');
  }

}
