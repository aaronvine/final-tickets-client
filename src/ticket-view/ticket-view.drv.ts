import TicketsService from '../tickets.srv';
import TicketList from '../common/ticketList';
import Ticket from '../common/ticket';

class TicketViewDirectiveController {
  ticket: Ticket;
  ticketReplies: {}[];
  ticketId: string;

  /* @ngInject */
  constructor(ticketsService: TicketsService, $scope: any) {
    this.ticket = $scope.ticket;
    this.ticketReplies = this.ticket.getTicketReplies();
    this.ticketId = this.ticket.getTicketId();
    console.log('ticket-id(ticket view): ', this.ticketId);
  };
}

export default function TicketViewDirectiveFactory(): ng.IDirective {
  return <ng.IDirective> {
    restrict: 'E',
    scope: {
      ticket: '='
    },
    template: '<h3>From: {{ctrl.ticket.getTicketUserEmail()}}</h3>' +
              '<ul class="latest-tickets-list">' +
                '<li class="ticket" <b>{{ctrl.ticket.getTicketTitle()}}</b><br><pre>{{ctrl.ticket.getTicketContent()}}</pre></li>' +
              '</ul>' +
              '<replies ng-model="ctrl.ticketReplies"></replies>' +
              '<reply-submit id="{{ctrl.ticketId}}"></reply-submit>',
    controller: TicketViewDirectiveController,
    controllerAs: 'ctrl'
  };
}
