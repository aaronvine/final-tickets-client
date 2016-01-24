import TicketsService from '../tickets.srv';
import Ticket from '../common/ticket';

class LatestTicketsDirectiveController {
  tickets: Ticket[];
  itemsLimit = 5;
  title = 'Latest Tickets';

  /* @ngInject */
  constructor(ticketsService: TicketsService) {
    let tempTicketsList = this.tickets;
    let myTicketsList = $.extend(true, [], tempTicketsList);
    this.tickets = myTicketsList;
    if (this.tickets.length > 5) {
      this.tickets = this.tickets.splice(this.tickets.length - this.itemsLimit, this.itemsLimit);
    }
    console.log('LatestTicketsDirectiveController.tickets: ', this.tickets);
  }
}

export default function LatestTicketsDirectiveFactory(): ng.IDirective {
  return <ng.IDirective> {
    restrict: 'E',
    scope: {
      tickets: '='
    },
    template: '<h3>{{ctrl.title}}</h3>' +
              '<ul class="latest-tickets-list">' +
                '<li class="ticket" ng-repeat="ticket in ctrl.tickets"><a ui-sref="ticket({ticketId: ticket.getTicketId()})"><label class="ticket-title">{{ticket.getTicketTitle()}}</label></a><br><pre class="ticket-content">{{ticket.getTicketContent().split("\n")[0] | htmlToPlaintext}}</pre></li>' +
              '</ul>',
    controller: LatestTicketsDirectiveController,
    controllerAs: 'ctrl',
    bindToController: true
  };
}
