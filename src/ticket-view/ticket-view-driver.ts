/// <reference path='../../typings/tsd.d.ts'/>
import Ticket from '../common/ticket';

export default class TicketViewDriver {

  elem: JQuery;
  scope;

  constructor(elem, scope) {
    this.elem = elem;
    this.scope = scope;
  }

  static build(ticket: Ticket): TicketViewDriver {
    let elem, scope : any;
    inject(($rootScope, $compile) => {
      scope = $rootScope.$new();
      scope.ticket = ticket;
      elem = $compile('<ticket-view ticket="ticket"></ticket-view>')(scope);
      scope.$digest();
    });
    return new TicketViewDriver(elem, scope);
  }

  getEmail(): string {
    return this.elem.find('h3').eq(0).text().split(' ')[1];
  }

  getRepliesDrv(): any {
    return this.elem.find('replies');
  }

  getReplySubmitDrv(): any {
    return this.elem.find('reply-submit');
  }

  getTicketTitle(): string {
    return this.elem.find('.ticket-title').text();
  }

  getTicketContent(): string {
    return this.elem.find('.ticket-content').text();
  }

}
